package com.cloudBalance.Backend.security.service;

import com.cloudBalance.Backend.security.userDetails.UserPrincipal;
import com.cloudBalance.Backend.repository.UserRepository;
import io.jsonwebtoken.*;
import io.jsonwebtoken.security.Keys;
import lombok.Data;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import javax.crypto.SecretKey;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

@Component
@Data
@Slf4j
public class JWTService {
    @Value("${app.secret-key}")
    private String secretKey;

    @Value("${app.expiration.accessToken}")
    private int accessTokenExpiration;

    @Value("${app.expiration.refreshToken}")
    private int refreshTokenExpiration;

    private final UserRepository userRepository;

    public JWTService(UserRepository userRepository){
        this.userRepository = userRepository;
    }

    private SecretKey getKey(){
        return Keys.hmacShaKeyFor(secretKey.getBytes());
    }

    public String generateAccessToken(UserPrincipal userPrincipal){
        Map<String,Object> claims = new HashMap<>();
        claims.put("role",userPrincipal.getRole().getRole().name());
        return generateToken(userPrincipal,accessTokenExpiration,claims);
    }

    public String generateRefreshToken(UserPrincipal userPrincipal){
        Map<String,Object> claims = new HashMap<>();
        return generateToken(userPrincipal,refreshTokenExpiration,claims);
    }

    public String generateToken(UserPrincipal userPrincipal, int expiration,Map<String,Object> claims ){
        return Jwts.builder()
                .claims(claims)
                .subject(userPrincipal.getUsername())
                .issuedAt(new Date())
                .expiration(new Date(new Date().getTime() + expiration))
                .signWith(getKey())
                .compact();
    }

    public boolean validateToken(String token) {
//        try{
            Jwts.parser()
                    .verifyWith(getKey())
                    .build()
                    .parseSignedClaims(token);
            return true;
//        }catch (MalformedJwtException e){
//            log.error("Token have been changed {}",e.getMessage());
//        }catch (ExpiredJwtException e){
//            log.error("Token Expired {}",e.getMessage());
////            throw new InvalidTokenException("Token has expired");
//        } catch (UnsupportedJwtException e){
//            log.error("JWT is unsupported {}",e.getMessage());
//        }catch (IllegalArgumentException e){
//            log.error("JWT claims String is empty {}",e.getMessage());
//        }
//        return false;
    }

    public String getUsername(String token){
        return Jwts.parser()
                .verifyWith(getKey())
                .build()
                .parseSignedClaims(token)
                .getPayload()
                .getSubject();
    }

}
