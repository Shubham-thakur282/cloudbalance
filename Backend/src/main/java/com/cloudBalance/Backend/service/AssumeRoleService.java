package com.cloudBalance.Backend.service;

import software.amazon.awssdk.auth.credentials.AwsSessionCredentials;

public interface AssumeRoleService {
    AwsSessionCredentials assumeRole(String arn);
}
