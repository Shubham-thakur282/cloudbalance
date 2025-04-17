package com.cloudBalance.Backend.service.Impl;

import com.cloudBalance.Backend.DTO.*;
import com.cloudBalance.Backend.entity.Accounts;
import com.cloudBalance.Backend.entity.Roles;
import com.cloudBalance.Backend.entity.UserPrincipal;
import com.cloudBalance.Backend.entity.Users;
import com.cloudBalance.Backend.exception.RoleNotFound;
import com.cloudBalance.Backend.exception.UserAlreadyExistException;
import com.cloudBalance.Backend.exception.UserNotFound;
import com.cloudBalance.Backend.repository.AccountRepository;
import com.cloudBalance.Backend.repository.RoleRepository;
import com.cloudBalance.Backend.repository.UserRepository;
import com.cloudBalance.Backend.service.UsersService;
import com.cloudBalance.Backend.utils.EntityDTOMapping;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Objects;


@Service
@AllArgsConstructor
@Slf4j
public class UsersServiceImpl implements UsersService {
    private final UserRepository userRepository;
    private final RoleRepository roleRepository;
    private final BCryptPasswordEncoder passwordEncoder;
    private final AccountRepository accRepo;

    @Transactional
    @Override
    public UserDTO createUser(UserDTO userDTO) {
        Users userEntity = userRepository.findByEmail(userDTO.getEmail());

        if (Objects.nonNull(userEntity)) {
            log.info("User with email {} already exists", userDTO.getEmail());
            throw new UserAlreadyExistException(userDTO.getEmail());
        }

        userEntity = EntityDTOMapping.userDTOToEntity(userDTO);
        if (!userDTO.getAccountIds().isEmpty()) {
            List<Accounts> accountsList = accRepo.findAllByAccountIdIn(userDTO.getAccountIds());
            accountsList.stream().map((a) ->{
               a.setIsOrphan(false);
               accRepo.save(a);
               return a;
            });
            userEntity.setAccountsList(accountsList);
        }
        userEntity.setPassword(passwordEncoder.encode(userDTO.getPassword()));
        Roles role = roleRepository.findById(userDTO.getRoleId())
                .orElseThrow(() -> new RoleNotFound("Role with id " + userDTO.getRoleId() + " "));

        userEntity.setRole(role);
        userRepository.save(userEntity);
        log.info("user {} saved", userDTO.getEmail());
        return userDTO;
    }

    @Override
    public Page<UsersView> getUsers(int page, int size) {
        PageRequest pageable = PageRequest.of(page, size);
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        UserPrincipal user = (UserPrincipal) auth.getPrincipal();
        //        Page<UsersView> u = userRepository.findAllUsers(pageable);
        return userRepository.findAllUsers(pageable, user.getUsername());
    }

    @Override
    public UserResponseDTO getUser(Long id) {
        Users user = userRepository.findById(id).orElseThrow(() -> new UserNotFound("User with not found"));
        log.info("User with {} found and details sent dto", id);
        return EntityDTOMapping.userEntityToResponseDTO(user);
    }

    @Transactional
    @Override
    public UserUpdateResponseDTO updateUser(Long id, UserUpdateDTO userUpdateDTO) {
        Users user = userRepository.findById(id).orElseThrow(() -> new UserNotFound("User not found"));
        log.info("User with id {} found ", id);

        Roles role = roleRepository.findById(userUpdateDTO.getRoleId()).orElseThrow(
                () -> new RoleNotFound("role not found")
        );

        UserUpdateResponseDTO userUpdateResponseDTO = new UserUpdateResponseDTO();
        user.setName(userUpdateDTO.getName());
        if (!userUpdateDTO.getAccountIds().isEmpty() && "CUSTOMER".equals(role.getRole().name())) {
            List<Accounts> accountsList = accRepo.findAllByAccountIdIn(userUpdateDTO.getAccountIds());
            accountsList.stream()
                            .map(a -> {
                                a.setIsOrphan(false);
                                accRepo.save(a);
                                return a;
                            });
            user.setAccountsList(accountsList);
            //setting new accounts of user in response dto
            userUpdateResponseDTO.setAccounts(user.getAccountsList()
                    .stream()
                    .map(EntityDTOMapping::accEntityToResponse)
                    .toList());
        } else {
            user.setAccountsList(null);
        }

        user.setRole(role);
        userRepository.save(user);
        //setting new values of user in response dto
        userUpdateResponseDTO.setName(user.getName());
        userUpdateResponseDTO.setEmail(user.getEmail());
        userUpdateResponseDTO.setRole(user.getRole().getRole().name());
//        userUpdateResponseDTO = EntityDTOMapping.UserEntityToResponseDTO(user);
        return userUpdateResponseDTO;
    }

    public String removeUser(Long id){
        Users user = userRepository.findById(id).orElseThrow(
                () -> new UserNotFound("User with id "+id+" does not exists")
        );
        userRepository.delete(user);
        return "User Removed";
    }
}
