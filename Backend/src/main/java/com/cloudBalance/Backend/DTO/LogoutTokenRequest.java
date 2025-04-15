package com.cloudBalance.Backend.DTO;

import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class LogoutTokenRequest {
    @NotNull
    private String accessToken;
    @NotNull
    private String refreshToken;
}
