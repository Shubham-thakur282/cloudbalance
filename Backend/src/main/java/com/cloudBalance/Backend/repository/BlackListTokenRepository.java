package com.cloudBalance.Backend.repository;

import com.cloudBalance.Backend.entity.BlackListToken;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface BlackListTokenRepository extends JpaRepository<BlackListToken,Long>{
    Optional<BlackListToken> findByRefreshToken(String refreshToken);
    Optional<BlackListToken> findByAccessToken(String accessToken);
}