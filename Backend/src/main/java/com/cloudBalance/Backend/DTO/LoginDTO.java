package com.cloudBalance.Backend.DTO;

import lombok.Data;
import lombok.NonNull;

@Data
public class LoginDTO {
    @NonNull
    private String email;
    @NonNull
    private String password;
}
