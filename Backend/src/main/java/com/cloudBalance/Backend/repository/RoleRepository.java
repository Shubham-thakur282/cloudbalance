package com.cloudBalance.Backend.repository;

import com.cloudBalance.Backend.DTO.RolesResponse;
import com.cloudBalance.Backend.entity.Roles;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface RoleRepository extends JpaRepository<Roles,Long> {
    @Query(value = """
            SELECT id as id,
            role as name
            FROM roles
            """, nativeQuery = true)
    List<RolesResponse> findAllRoles();
    Roles getByRole(String Role);
}
