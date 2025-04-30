package com.cloudBalance.Backend.DTO;

import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class LogoutTokenRequest {
    @NotNull(message = "Access Token cannot be null")
    @NotEmpty(message = "Access Token cannot be empty")
    private String accessToken;
    @NotNull(message = "Refresh Token cannot be null")
    @NotEmpty(message = "Refresh Token cannot be empty")
    private String refreshToken;
}
