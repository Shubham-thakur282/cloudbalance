package com.cloudBalance.Backend.service;

import com.cloudBalance.Backend.DTO.RolesResponse;
import java.util.List;

public interface RolesService {
    List<RolesResponse> getRoles();
}
