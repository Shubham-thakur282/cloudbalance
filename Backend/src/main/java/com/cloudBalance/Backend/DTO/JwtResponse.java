package com.cloudBalance.Backend.DTO;

import com.cloudBalance.Backend.entity.Permissions;
import com.cloudBalance.Backend.security.userDetails.UserPrincipal;
import lombok.Data;
import org.springframework.http.HttpStatus;

import java.util.List;

@Data
public class JwtResponse {

    public JwtResponse(String accessToken,String refreshToken, HttpStatus statusCode, UserPrincipal userPrincipal){
        this.accessToken = accessToken;
        this.refreshToken = refreshToken;
        this.statusCode = statusCode.value();
        this.email = userPrincipal.getUsername();
        this.role = userPrincipal.getRole().getRole().name();
        this.name = userPrincipal.getName();
        this.permissions = userPrincipal.getRole().getPermissions();

    }

    private String accessToken;
    private String refreshToken;
    private int statusCode;
    private String email;
    private String name;
    private String role;
    private List<Permissions> permissions;
}
