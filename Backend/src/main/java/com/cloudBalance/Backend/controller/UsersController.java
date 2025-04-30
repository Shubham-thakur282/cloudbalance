package com.cloudBalance.Backend.controller;

import com.cloudBalance.Backend.DTO.*;
import com.cloudBalance.Backend.service.UsersService;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/users")
@AllArgsConstructor
@Slf4j
public class UsersController {
    private final UsersService usersService;

    @PreAuthorize("hasAuthority('ADMIN')")
    @PostMapping
    public ResponseEntity<UserDTO> addUser(@Valid @RequestBody UserDTO user){
        log.info("Adding user with email id {}",user.getEmail());
        return ResponseEntity.ok(usersService.createUser(user));
    }

    @PreAuthorize("hasAnyAuthority('ADMIN','READONLY')")
    @GetMapping
    public ResponseEntity<Page<UsersView>> getUsers(@RequestParam(defaultValue = "0") int page,
                                                    @RequestParam(defaultValue = "10") int size){
        return ResponseEntity.ok(usersService.getUsers(page,size));
    }

    @PreAuthorize("hasAuthority('ADMIN')")
    @PatchMapping("/{id}")
    public ResponseEntity<UserUpdateResponseDTO> updateUser(@PathVariable Long id,
                                                            @Valid @RequestBody UserUpdateDTO userUpdateDTO){
        return ResponseEntity.ok(usersService.updateUser(id, userUpdateDTO));
    }

    @PreAuthorize("hasAuthority('ADMIN')")
    @GetMapping("/{id}")
    public ResponseEntity<UserResponseDTO> getUser(@PathVariable Long id){
        return ResponseEntity.ok(usersService.getUser(id));
    }

    @PreAuthorize("hasAuthority('ADMIN')")
    @DeleteMapping("/{id}")
    public ResponseEntity<String> removeUser(@PathVariable Long id){
        return ResponseEntity.ok(usersService.removeUser(id));
    }

}
