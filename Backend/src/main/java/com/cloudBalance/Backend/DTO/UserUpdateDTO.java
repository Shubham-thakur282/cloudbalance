package com.cloudBalance.Backend.DTO;

import lombok.Data;

import java.util.List;

@Data
public class UserUpdateDTO {
    private String name;
    private Long roleId;
    private List<Long> accountIds;
}
