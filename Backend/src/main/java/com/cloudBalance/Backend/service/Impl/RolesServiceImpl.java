package com.cloudBalance.Backend.service.Impl;

import com.cloudBalance.Backend.DTO.RolesResponse;
import com.cloudBalance.Backend.repository.RoleRepository;
import com.cloudBalance.Backend.service.RolesService;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@AllArgsConstructor
@Slf4j
public class RolesServiceImpl implements RolesService {
    private final RoleRepository roleRepository;

    @Override
    public List<RolesResponse> getRoles() {
        log.info("api call has reached in service");
        return roleRepository.findAllRoles();
    }
}
