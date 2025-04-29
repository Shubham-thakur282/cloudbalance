package com.cloudBalance.Backend.repository;

import com.cloudBalance.Backend.entity.Permissions;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PermissionRepository extends JpaRepository<Permissions,Long> {
}
