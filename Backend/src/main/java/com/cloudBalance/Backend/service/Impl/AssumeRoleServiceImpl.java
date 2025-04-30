package com.cloudBalance.Backend.service.Impl;

import com.cloudBalance.Backend.constants.Constants;
import com.cloudBalance.Backend.exception.handleAwsClientException;
import com.cloudBalance.Backend.service.AssumeRoleService;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.apache.tomcat.util.bcel.Const;
import org.springframework.stereotype.Service;
import software.amazon.awssdk.auth.credentials.AwsSessionCredentials;
import software.amazon.awssdk.services.sts.StsClient;
import software.amazon.awssdk.services.sts.model.AssumeRoleRequest;
import software.amazon.awssdk.services.sts.model.AssumeRoleResponse;
import software.amazon.awssdk.services.sts.model.Credentials;
import software.amazon.awssdk.services.sts.model.StsException;

@Service
@AllArgsConstructor
@Slf4j
public class AssumeRoleServiceImpl implements AssumeRoleService {
    private final StsClient stsClient;

    @Override
    public AwsSessionCredentials assumeRole(String arn) {
        try {
            AssumeRoleRequest request = AssumeRoleRequest.builder()
                    .roleArn(arn)
                    .roleSessionName(Constants.CLOUDBALANCE)
                    .durationSeconds(3600)
                    .build();
            AssumeRoleResponse response = stsClient.assumeRole(request);
            Credentials credentials = response.credentials();
            return AwsSessionCredentials.create(
                    credentials.accessKeyId(),
                    credentials.secretAccessKey(),
                    credentials.sessionToken()
            );
        }catch (StsException e){
            if(Constants.VALIDATIONERROR.equals(e.awsErrorDetails().errorCode())){
                throw new handleAwsClientException("Arn is not valid");
            }
            if(Constants.ACCESSDENIED.equals(e.awsErrorDetails().errorCode())){
                throw new handleAwsClientException("Access denied");
            }
            throw new handleAwsClientException("Unexpected Error Occurred");
        }
    }
}
