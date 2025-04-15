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

    private String accessToken;
    private String refreshToken;
}
