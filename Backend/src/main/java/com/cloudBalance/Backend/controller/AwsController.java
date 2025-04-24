package com.cloudBalance.Backend.controller;

import com.cloudBalance.Backend.DTO.AsgResponse;
import com.cloudBalance.Backend.DTO.Ec2Response;
import com.cloudBalance.Backend.DTO.RdsResponse;
import com.cloudBalance.Backend.service.AwsService;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@AllArgsConstructor
@RequestMapping("/aws")
public class AwsController {
    private final AwsService awsService;

    @GetMapping("/ec2/{accountId}")
    public ResponseEntity<List<Ec2Response>> getEc2Information(@PathVariable String accountId){
        return ResponseEntity.ok(awsService.getEc2Information(accountId));
    }

    @GetMapping("/rds/{accountId}")
    public ResponseEntity<List<RdsResponse>> getRdsInformation(@PathVariable String accountId){
        return ResponseEntity.ok(awsService.getRdsInformation(accountId));
    }

    @GetMapping("/asg/{accountId}")
    public ResponseEntity<List<AsgResponse>> getAsgInformation(@PathVariable String accountId){
        return ResponseEntity.ok(awsService.getAsgInformation(accountId));
    }
}
