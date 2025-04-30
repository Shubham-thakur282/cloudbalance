package com.cloudBalance.Backend.DTO;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class LoginDTO {
    @NotNull(message = "Email can not be null")
    @NotEmpty(message = "Email can not be empty")
    @Email
    private String email;
    @NotNull(message = "Password can not be null")
    @NotEmpty(message = "Password can not be empty")
    private String password;
}
