package com.cloudBalance.Backend.DTO;

import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class RefreshTokenRequest {
    @NotNull(message = "Refresh Token cannot be null")
    @NotNull(message = "Refresh Token cannot be empty")
    private String refreshToken;
}
