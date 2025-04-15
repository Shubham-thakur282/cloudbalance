package com.cloudBalance.Backend.controller;

import com.cloudBalance.Backend.DTO.RolesResponse;
import com.cloudBalance.Backend.service.RolesService;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/roles")
@Slf4j
@AllArgsConstructor
public class RolesController {
    private final RolesService rolesService;

    @GetMapping
    @PreAuthorize("hasAuthority('ADMIN')")
    public ResponseEntity<List<RolesResponse>> getRoles(){
        log.info("api call has reached in controller");
        return ResponseEntity.ok(rolesService.getRoles());
    }
}
