package com.cloudBalance.Backend.entity;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table(name = "accounts")
@Data
public class Accounts {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String arn;

    private String accountId;

    private String accountName;

//    private String accountRole;

    private Boolean isOrphan;
}
