package com.cloudBalance.Backend.DTO;

import lombok.Data;

import java.util.List;

@Data
public class UserResponseDTO {
    private String name;
    private List<AccountsResponse> assignedAccounts;
    private String role;
    private Long roleId;
    private String email;
}
