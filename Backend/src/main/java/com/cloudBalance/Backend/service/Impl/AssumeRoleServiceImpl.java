package com.cloudBalance.Backend.service.Impl;

import com.cloudBalance.Backend.service.AssumeRoleService;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import software.amazon.awssdk.auth.credentials.AwsSessionCredentials;
import software.amazon.awssdk.services.sts.StsClient;
import software.amazon.awssdk.services.sts.model.AssumeRoleRequest;
import software.amazon.awssdk.services.sts.model.AssumeRoleResponse;
import software.amazon.awssdk.services.sts.model.Credentials;

@Service
@AllArgsConstructor
public class AssumeRoleServiceImpl implements AssumeRoleService {
    private final StsClient stsClient;

    @Override
    public AwsSessionCredentials assumeRole(String arn) {
        AssumeRoleRequest request = AssumeRoleRequest.builder()
                .roleArn(arn)
                .roleSessionName("cloudbalance")
                .durationSeconds(3600)
                .build();
        AssumeRoleResponse response = stsClient.assumeRole(request);
        Credentials credentials = response.credentials();
        return AwsSessionCredentials.create(
                credentials.accessKeyId(),
                credentials.secretAccessKey(),
                credentials.sessionToken()
        );
    }
}
