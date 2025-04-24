package com.cloudBalance.Backend.DTO;

import lombok.Data;

@Data
public class Ec2Response {
    private String resourceId;
    private String resourceName;
    private String region;
    private String status;
}
