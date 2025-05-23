package com.cloudBalance.Backend.service.Impl;

import com.cloudBalance.Backend.exception.handleAwsClientException;
import com.cloudBalance.Backend.utils.AwsUtils;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import com.cloudBalance.Backend.DTO.AsgResponse;
import com.cloudBalance.Backend.DTO.Ec2Response;
import com.cloudBalance.Backend.DTO.RdsResponse;
import com.cloudBalance.Backend.entity.Accounts;
import com.cloudBalance.Backend.exception.AccountNotFound;
import com.cloudBalance.Backend.repository.AccountRepository;
import com.cloudBalance.Backend.service.AssumeRoleService;
import com.cloudBalance.Backend.service.AwsService;
import software.amazon.awssdk.auth.credentials.AwsSessionCredentials;
import software.amazon.awssdk.auth.credentials.StaticCredentialsProvider;
import software.amazon.awssdk.regions.Region;
import software.amazon.awssdk.services.autoscaling.AutoScalingClient;
import software.amazon.awssdk.services.autoscaling.model.AutoScalingGroup;
import software.amazon.awssdk.services.autoscaling.model.DescribeAutoScalingGroupsRequest;
import software.amazon.awssdk.services.autoscaling.model.DescribeAutoScalingGroupsResponse;
import software.amazon.awssdk.services.ec2.Ec2Client;
import software.amazon.awssdk.services.ec2.model.DescribeInstancesRequest;
import software.amazon.awssdk.services.ec2.model.DescribeInstancesResponse;
import software.amazon.awssdk.services.ec2.model.Reservation;
import software.amazon.awssdk.services.ec2.model.Tag;
import software.amazon.awssdk.services.rds.RdsClient;
import software.amazon.awssdk.services.rds.model.DBInstance;
import software.amazon.awssdk.services.rds.model.DescribeDbInstancesRequest;
import software.amazon.awssdk.services.rds.model.DescribeDbInstancesResponse;
import software.amazon.awssdk.services.sts.model.StsException;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
@Slf4j
public class AwsServiceImpl implements AwsService {
    private final AssumeRoleService assumeRoleService;
    private final AccountRepository accountRepository;

    @Override
    public List<Ec2Response> getEc2Information(String accountId){
        Optional<Accounts> account = accountRepository.findByAccountId(accountId);
        if(account.isEmpty()){
            throw new AccountNotFound("Account Not Found");
        }

        DescribeInstancesRequest request =
                DescribeInstancesRequest.builder().build();

        AwsSessionCredentials sessionCredentials = assumeRoleService.assumeRole(account.get().getArn());
        try(Ec2Client ec2Client = AwsUtils.getEc2Client(sessionCredentials)) {
            DescribeInstancesResponse response = ec2Client.describeInstances(request);
            List<Reservation> reservations = response.reservations();

            List<Ec2Response> responseList = new ArrayList<>();
            for (Reservation reservation : reservations) {
                reservation.instances().forEach(instance -> {
                    Ec2Response ec2Response = new Ec2Response();

                    String name = instance.tags().stream()
                            .filter(tag -> tag.key().equalsIgnoreCase("Name"))
                            .map(Tag::value)
                            .findFirst()
                            .orElse("UnNamed");

                    ec2Response.setResourceId(instance.instanceId());
                    ec2Response.setResourceName(name);
                    ec2Response.setRegion(ec2Client.serviceClientConfiguration().region().toString());
                    ec2Response.setStatus(instance.state().nameAsString());
                    responseList.add(ec2Response);
                });
            }
            return responseList;
        }
        catch (StsException e){
            log.info("here {}",e.awsErrorDetails().errorCode());
            throw new handleAwsClientException(e.awsErrorDetails().errorCode());
        }
    }

    @Override
    public List<RdsResponse> getRdsInformation(String accountId){
        Optional<Accounts> account = accountRepository.findByAccountId(accountId);
        if(account.isEmpty()){
            throw new AccountNotFound("Account Not Found");
        }

        AwsSessionCredentials sessionCredentials = assumeRoleService.assumeRole(account.get().getArn());
        try(RdsClient rdsClient = AwsUtils.getRdsClient(sessionCredentials)) {

            DescribeDbInstancesResponse response = rdsClient
                    .describeDBInstances(DescribeDbInstancesRequest.builder().build());

            List<RdsResponse> rdsDetailsList = new ArrayList<>();
            for (DBInstance dbInstance : response.dbInstances()) {
                RdsResponse details = new RdsResponse();
                details.setResourceId(dbInstance.dbInstanceArn());
                details.setEngine(dbInstance.engine());
                details.setResourceName(dbInstance.dbInstanceIdentifier());
                details.setRegion(rdsClient.serviceClientConfiguration().region().toString());
                details.setStatus(dbInstance.dbInstanceStatus());
                rdsDetailsList.add(details);
            }
            return rdsDetailsList;
        }
        catch (StsException e){
            log.info("here {}",e.awsErrorDetails().errorCode());
            throw new handleAwsClientException(e.awsErrorDetails().errorCode());
        }
    }

    public List<AsgResponse> getAsgInformation(String accountId){
        Optional<Accounts> account = accountRepository.findByAccountId(accountId);
        if(account.isEmpty()){
            throw new AccountNotFound("Account Not Found");
        }

        AwsSessionCredentials sessionCredentials = assumeRoleService.assumeRole(account.get().getArn());
        try(AutoScalingClient asgClient = AwsUtils.getAsgClient(sessionCredentials)) {

            DescribeAutoScalingGroupsRequest request = DescribeAutoScalingGroupsRequest.builder().build();
            DescribeAutoScalingGroupsResponse response = asgClient.describeAutoScalingGroups(request);

            List<AsgResponse> asgResponseList = new ArrayList<>();
            for (AutoScalingGroup group : response.autoScalingGroups()) {
                AsgResponse details = new AsgResponse();
                details.setResourceId(group.autoScalingGroupARN());
                details.setResourceName(group.autoScalingGroupName());
                details.setDesiredCapacity(group.desiredCapacity());
                details.setMinSize(group.minSize());
                details.setMaxSize(group.maxSize());
                details.setRegion(asgClient.serviceClientConfiguration().region().toString());
                asgResponseList.add(details);
            }
            return asgResponseList;
        }catch (StsException e){
            log.info("here {}",e.awsErrorDetails().errorCode());
            throw new handleAwsClientException(e.awsErrorDetails().errorCode());
        }
    }
}