package com.cloudBalance.Backend.repository;

import com.cloudBalance.Backend.entity.BlackListToken;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface BlackListTokenRepository extends JpaRepository<BlackListToken,Long>{
    Optional<BlackListToken> findByRefreshToken(String refreshToken);
    Optional<BlackListToken> findByAccessToken(String accessToken);
}