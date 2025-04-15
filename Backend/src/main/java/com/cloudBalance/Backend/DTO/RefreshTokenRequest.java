package com.cloudBalance.Backend.DTO;

import lombok.Data;
import lombok.NonNull;

@Data
public class RefreshTokenRequest {
    @NonNull
    private String refreshToken;
}
