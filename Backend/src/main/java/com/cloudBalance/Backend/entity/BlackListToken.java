package com.cloudBalance.Backend.entity;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table(name="black_list_token")
@Data
public class BlackListToken {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "access_token")
    private String accessToken;
    @Column(name = "refresh_token")
    private String refreshToken;
}
