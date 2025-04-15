package com.cloudBalance.Backend.DTO;

import lombok.Data;

import java.util.List;

@Data
public class UserUpdateResponseDTO {
    private String name;
    private String email;
    private String role;
    private List<AccountsResponse> accounts;
}
