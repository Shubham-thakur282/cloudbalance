package com.cloudBalance.Backend.DTO;

import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

import java.util.List;

@Data
public class UserUpdateDTO {
    @NotEmpty(message = "Name can not be empty")
    @NotNull(message = "Name can not be null")
    private String name;

    @NotNull(message = "Role id can not be null")
    private Long roleId;
    private List<Long> accountIds;
}
