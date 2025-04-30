package com.cloudBalance.Backend.DTO;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Data;

import java.util.List;

@Data
public class UserDTO {
    @NotEmpty(message = "Email cannot be empty")
    @NotNull(message = "Email cannot be null")
    @Email
    private String email;

    @NotEmpty(message = "Name cannot be empty")
    @NotNull(message = "Name cannot be null")
    @Size(min = 3,max = 20)
    private String name;

    @NotNull(message = "Role id cannot be null")
    private Long roleId;

    @NotEmpty(message = "Password cannot be empty")
    @NotNull(message = "Password cannot be null")
    private String password;

    private List<Long> accountIds;
}
