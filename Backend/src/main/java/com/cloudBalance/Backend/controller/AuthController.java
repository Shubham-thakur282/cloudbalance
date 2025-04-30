package com.cloudBalance.Backend.controller;

import com.cloudBalance.Backend.DTO.JwtResponse;
import com.cloudBalance.Backend.DTO.LoginDTO;
import com.cloudBalance.Backend.DTO.LogoutTokenRequest;
import com.cloudBalance.Backend.DTO.RefreshTokenRequest;
import com.cloudBalance.Backend.service.AuthService;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/auth")
@AllArgsConstructor
@Slf4j
public class AuthController {

    private final AuthService authService;

    @PostMapping("/login")
    public ResponseEntity<JwtResponse> login(@Valid @RequestBody LoginDTO loginDTO) {
        log.info("{} is trying to log in", loginDTO.getEmail());
        return ResponseEntity.ok(authService.login(loginDTO));
    }

    @PostMapping("/refresh-token")
    public ResponseEntity<String> refreshToken(@Valid @RequestBody
                                               RefreshTokenRequest refreshTokenRequest) {
        return ResponseEntity.ok(authService.newAccessToken(refreshTokenRequest.getRefreshToken()));
    }

    @PostMapping("/logout")
    public void logout(@Valid @RequestBody LogoutTokenRequest logoutTokenRequest) {
        authService.logout(logoutTokenRequest);
    }
}
