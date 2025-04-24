package com.cloudBalance.Backend.DTO;

import lombok.Data;

@Data
public class RdsResponse {
    private String resourceId;
    private String resourceName;
    private String region;
    private String engine;
    private String status;
}
