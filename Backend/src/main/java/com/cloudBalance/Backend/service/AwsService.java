package com.cloudBalance.Backend.service;

import com.cloudBalance.Backend.DTO.AsgResponse;
import com.cloudBalance.Backend.DTO.Ec2Response;
import com.cloudBalance.Backend.DTO.RdsResponse;

import java.util.List;

public interface AwsService {
    List<Ec2Response> getEc2Information(String accountId);
    List<RdsResponse> getRdsInformation(String accountId);
    List<AsgResponse> getAsgInformation(String accountId);
}
