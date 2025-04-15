package com.cloudBalance.Backend.service;

import com.cloudBalance.Backend.DTO.*;
import org.springframework.data.domain.Page;


public interface UsersService {
    UserDTO createUser(UserDTO user);
    Page<UsersView> getUsers(int page, int size);
    UserResponseDTO getUser(Long id);
    UserUpdateResponseDTO updateUser(Long id, UserUpdateDTO user);

}
