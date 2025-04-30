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

    @Column(name = "arn")
    private String arn;

    @Column(name = "account_id")
    private String accountId;

    @Column(name = "account_name")
    private String accountName;

    @Column(name = "is_orphan")
    private Boolean isOrphan;
}
