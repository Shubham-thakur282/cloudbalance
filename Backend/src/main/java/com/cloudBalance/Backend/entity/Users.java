package com.cloudBalance.Backend.entity;

import jakarta.persistence.*;
import lombok.Data;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Entity
@Table(name = "users")
@Data
public class Users {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "email")
    private String email;

    @Column(name = "name")
    private String name;

    @Column(name = "password")
    private String password;

    @Column(name = "last_login")
    private String lastLogin;

    @ManyToOne
    @JoinColumn(name = "role_id")
    private Roles role;

    @ManyToMany
    @JoinTable(
            name = "users_accounts",
            joinColumns = @JoinColumn(name = "user_id"),
            inverseJoinColumns = @JoinColumn(name ="account_id")
    )
    private List<Accounts> accountsList = new ArrayList<>();

    @Override
    public String toString() {
        return "Users{" +
                ", id=" + id +
                ", name='" + name + '\'' +
                ", email='" + email + '\'' +
                "password='" + password + '\'' +
                '}';
    }
}
