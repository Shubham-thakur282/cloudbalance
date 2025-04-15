package com.cloudBalance.Backend.service;

import com.cloudBalance.Backend.DTO.JwtResponse;
import com.cloudBalance.Backend.DTO.LoginDTO;
import com.cloudBalance.Backend.DTO.LogoutTokenRequest;

public interface AuthService {
    JwtResponse login(LoginDTO loginDTO);
    String newAccessToken(String refreshToken);
    void logout(LogoutTokenRequest logoutTokenRequest);
}
