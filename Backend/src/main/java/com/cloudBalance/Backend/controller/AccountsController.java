package com.cloudBalance.Backend.controller;

import com.cloudBalance.Backend.DTO.AccountDTO;
import com.cloudBalance.Backend.DTO.AccountsResponse;
import com.cloudBalance.Backend.service.AccountsService;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@Slf4j
@RequestMapping("accounts")
@AllArgsConstructor
public class AccountsController {
    private final AccountsService accountsService;

    @PostMapping
    @PreAuthorize("hasAuthority('ADMIN')")
    public ResponseEntity<AccountDTO> createAccount(@Valid @RequestBody AccountDTO accountDTO){
        return ResponseEntity.ok(accountsService.createAccount(accountDTO));
    }

    @GetMapping
    public ResponseEntity<List<AccountsResponse>> getAccounts(){
        return ResponseEntity.ok(accountsService.getAccounts());
    }

    @DeleteMapping("/{accountId}")
    public ResponseEntity<?> removeAccount(){
//        return ResponseEntity.ok(accountsService.removeAccount());
    return null;
    }

}
