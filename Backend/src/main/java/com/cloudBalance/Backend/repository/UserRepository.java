package com.cloudBalance.Backend.repository;

import com.cloudBalance.Backend.DTO.UsersView;
import com.cloudBalance.Backend.entity.Users;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends JpaRepository<Users, Long> {
    Users findByEmail(String email);

    @Query(value = """
            SELECT u.id as id,
            u.name as name,
            u.email as email,
            u.last_login as last_login,
            r.role as role
            FROM users u LEFT JOIN roles r
            ON u.role_id = r.id
            where u.email != :email_id
            """, nativeQuery = true)
    Page<UsersView> findAllUsers(PageRequest pageRequest, @Param("email_id") String email);
}
