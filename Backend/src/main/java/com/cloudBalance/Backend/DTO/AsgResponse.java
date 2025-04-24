package com.cloudBalance.Backend.DTO;

import lombok.Data;

@Data
public class AsgResponse {
    private String resourceId;
    private String resourceName;
    private int desiredCapacity;
    private int minSize;
    private int maxSize;
    private String region;
    private String status;
}
