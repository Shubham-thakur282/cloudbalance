package com.cloudBalance.Backend.security.filter;

import com.cloudBalance.Backend.entity.BlackListToken;
import com.cloudBalance.Backend.security.userDetails.UserPrincipal;
import com.cloudBalance.Backend.exception.BlackListTokenException;
import com.cloudBalance.Backend.repository.BlackListTokenRepository;
import com.cloudBalance.Backend.security.service.JWTService;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.MalformedJwtException;
import io.jsonwebtoken.UnsupportedJwtException;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.util.StringUtils;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.util.Optional;

@Slf4j
@AllArgsConstructor
@Component
public class JwtFilter extends OncePerRequestFilter {
    private final JWTService jwtService;
    private final UserDetailsService userDetailsService;
    private final BlackListTokenRepository blackListTokenRepository;

    @Override
    protected void doFilterInternal(HttpServletRequest request,
                                    HttpServletResponse response,
                                    FilterChain filterChain) throws ServletException, IOException {
        try {
            String token = parseJwt(request);
            if (token != null && jwtService.validateToken(token)) {
                Optional<BlackListToken> isBlackListed = blackListTokenRepository.findByAccessToken(token);
                if (isBlackListed.isPresent()) {
                    log.info("Invalid token found");
                    throw new BlackListTokenException("Token is Invalid");
                }
                String email = jwtService.getUsername(token);
                UserPrincipal userPrincipal = (UserPrincipal)
                        userDetailsService.loadUserByUsername(email);
                UsernamePasswordAuthenticationToken auth =
                        new UsernamePasswordAuthenticationToken(
                                userPrincipal,
                                null,
                                userPrincipal.getAuthorities()
                        );
                auth.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
                SecurityContextHolder.getContext().setAuthentication(auth);
                log.info("{} has passed token check", email);
            }
            filterChain.doFilter(request, response);
        } catch (ExpiredJwtException | MalformedJwtException | UnsupportedJwtException
                 | IllegalArgumentException | BlackListTokenException e) {
            log.error("Not able to authenticate using jwt token {}", e.getMessage());
            response.setStatus(HttpStatus.UNAUTHORIZED.value());
            response.setContentType("application/json");
            response.getWriter().write("{\"error\": \"Invalid or expired JWT token\"}");
        }

    }

    private String parseJwt(HttpServletRequest request) {
        String token = request.getHeader("Authorization");
        if (StringUtils.hasText(token) && token.startsWith("Bearer ")) {
            return token.substring(7);
        }
        return null;
    }
}
