package com.cloudBalance.Backend.utils;

import com.cloudBalance.Backend.DTO.*;
import com.cloudBalance.Backend.entity.Accounts;
import com.cloudBalance.Backend.entity.Roles;
import com.cloudBalance.Backend.entity.Users;

public class EntityDTOMapping {
    public static Users userDTOToEntity(UserDTO userDTO) {
        Users user = new Users();
        user.setEmail(userDTO.getEmail());
        user.setName(userDTO.getName());
//        user.setRole(userDTO.getRole());
        return user;
    }

    public static UserUpdateResponseDTO UserEntityToResponseDTO(Users user) {
        UserUpdateResponseDTO userUpdateResponseDTO = new UserUpdateResponseDTO();
        userUpdateResponseDTO.setName(user.getName());
        userUpdateResponseDTO.setEmail(user.getEmail());
        userUpdateResponseDTO.setRole(user.getRole().getRole().name());
//        if (!user.getAccountsList().isEmpty()) {
//            userUpdateResponseDTO.setAccounts(user.getAccountsList()
//                    .stream()
//                    .map(EntityDTOMapping::accEntityToResponse)
//                    .toList());
//        }
        return userUpdateResponseDTO;
    }

    public static Accounts accountDTOToEntity(AccountDTO accountDTO) {
        Accounts acc = new Accounts();
        acc.setAccountId(accountDTO.getAccountId());
        acc.setAccountName(accountDTO.getAccountName());
        acc.setArn(accountDTO.getArn());
        acc.setIsOrphan(accountDTO.getIsOrphan());
        return acc;
    }

    public static AccountDTO accountEntityToDTO(Accounts account) {
        AccountDTO acc = new AccountDTO();
        acc.setAccountId(account.getAccountId());
        acc.setAccountName(account.getAccountName());
        acc.setArn(account.getArn());
        acc.setIsOrphan(account.getIsOrphan());
        return acc;
    }

    public static AccountsResponse accViewToResponse(AccountsView accountsView) {
        AccountsResponse acc = new AccountsResponse();
        acc.setAccountId(accountsView.getAccountId());
        acc.setAccountName(accountsView.getAccountName());
        acc.setIsOrphan(accountsView.getIsOrphan());
        return acc;
    }

    public static AccountsResponse accEntityToResponse(Accounts accounts) {
        AccountsResponse acc = new AccountsResponse();
        acc.setAccountId(accounts.getAccountId());
        acc.setAccountName(accounts.getAccountName());
        acc.setIsOrphan(accounts.getIsOrphan());
        return acc;
    }

    public static UserResponseDTO userEntityToResponseDTO(Users user) {
        UserResponseDTO userResponseDTO = new UserResponseDTO();
        userResponseDTO.setName(user.getName());
        Roles role = user.getRole();
        userResponseDTO.setRole(role.getRole().name());
        userResponseDTO.setRoleId(role.getId());
        userResponseDTO.setAssignedAccounts(user.getAccountsList()
                .stream()
                .map(EntityDTOMapping::accEntityToResponse)
                .toList());
        return userResponseDTO;
    }

}
