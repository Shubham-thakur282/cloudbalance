package com.cloudBalance.Backend.service.Impl;

import com.cloudBalance.Backend.DTO.AccountDTO;
import com.cloudBalance.Backend.DTO.AccountsResponse;
import com.cloudBalance.Backend.entity.Accounts;
import com.cloudBalance.Backend.entity.UserPrincipal;
import com.cloudBalance.Backend.entity.Users;
import com.cloudBalance.Backend.exception.AccountAlreadyExistsException;
import com.cloudBalance.Backend.repository.AccountRepository;
import com.cloudBalance.Backend.repository.UserRepository;
import com.cloudBalance.Backend.service.AccountsService;
import com.cloudBalance.Backend.utils.EntityDTOMapping;
import lombok.AllArgsConstructor;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
@AllArgsConstructor
public class AccountsServiceImpl implements AccountsService {
    private final AccountRepository accRepo;
    private final UserRepository userRepository;

    @Override
    @Transactional
    public AccountDTO createAccount(AccountDTO account) {
        Optional<Accounts> accountsOptional = accRepo
                .findByAccountId(account.getAccountId());
        if (accountsOptional.isPresent()) {
            throw new AccountAlreadyExistsException
                    ("Account already exists with account id "
                            + account.getAccountId()
                    );
        }
        Accounts newAccount = EntityDTOMapping.accountDTOToEntity(account);
        accRepo.save(newAccount);
        return account;
    }

    @Override
    public List<AccountsResponse> getAccounts() {
        UserPrincipal user = (UserPrincipal) SecurityContextHolder
                .getContext().getAuthentication().getPrincipal();

        if (user.getRole().getRole().name().equals("CUSTOMER")) {
            Users findUser = userRepository.findByEmail(user.getUsername());
            return findUser.getAccountsList()
                    .stream()
                    .map(EntityDTOMapping::accEntityToResponse).toList();
        }

        return accRepo.findAllAccounts()
                .stream()
                .map(EntityDTOMapping::accViewToResponse)
                .toList();
    }

}
