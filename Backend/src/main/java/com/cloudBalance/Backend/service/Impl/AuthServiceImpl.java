package com.cloudBalance.Backend.service.Impl;

import com.cloudBalance.Backend.DTO.JwtResponse;
import com.cloudBalance.Backend.DTO.LoginDTO;
import com.cloudBalance.Backend.DTO.LogoutTokenRequest;
import com.cloudBalance.Backend.entity.BlackListToken;
import com.cloudBalance.Backend.entity.UserPrincipal;
import com.cloudBalance.Backend.entity.Users;
import com.cloudBalance.Backend.exception.BlackListTokenException;
import com.cloudBalance.Backend.repository.BlackListTokenRepository;
import com.cloudBalance.Backend.repository.UserRepository;
import com.cloudBalance.Backend.security.service.JWTService;
import com.cloudBalance.Backend.service.AuthService;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.Optional;


@Slf4j
@Service
@AllArgsConstructor
public class AuthServiceImpl implements AuthService {

    private final AuthenticationManager authenticationManager;
    private final JWTService jwtService;
    private final UserDetailsService userDetailsService;
    private final BlackListTokenRepository blackListTokenRepository;
    private final UserRepository userRepository;


    @Transactional
    public JwtResponse login(LoginDTO loginDTO) {
        Authentication auth = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        loginDTO.getEmail(),
                        loginDTO.getPassword())
        );
        SecurityContextHolder.getContext().setAuthentication(auth);
        if (auth.isAuthenticated()) {
            UserPrincipal userPrincipal = (UserPrincipal) auth.getPrincipal();
            String accessToken = jwtService.generateAccessToken(userPrincipal);
            String refreshToken = jwtService.generateRefreshToken(userPrincipal);
            Users userData = userRepository.findByEmail(userPrincipal.getUsername());
            SimpleDateFormat date = new SimpleDateFormat("yyyy-MM-dd HH:mm");
            userData.setLastLogin(date.format(new Date()));
            userRepository.save(userData);
            return new JwtResponse(
                    accessToken,
                    refreshToken,
                    HttpStatus.OK,
                    userPrincipal
            );
        }
        throw new BadCredentialsException("bad credentials");
    }

    public String newAccessToken(String refreshToken) {
        Optional<BlackListToken> token = blackListTokenRepository.findByRefreshToken(refreshToken);

        if (token.isPresent()) {
            throw new BlackListTokenException("Token is not valid");
        }

        try {
            if (refreshToken != null && jwtService.validateToken(refreshToken)) {
                String email = jwtService.getUsername(refreshToken);
                UserPrincipal userPrincipal = (UserPrincipal) userDetailsService.loadUserByUsername(email);
                return jwtService.generateAccessToken(userPrincipal);
            }
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Token error " + e.getMessage()).toString();
        }
        return null;
    }

    @Transactional
    public void logout(LogoutTokenRequest logoutTokenRequest) {
        BlackListToken blackListToken = new BlackListToken();
        blackListToken.setAccessToken(logoutTokenRequest.getAccessToken());
        blackListToken.setRefreshToken(logoutTokenRequest.getRefreshToken());
        blackListTokenRepository.save(blackListToken);
    }
}
