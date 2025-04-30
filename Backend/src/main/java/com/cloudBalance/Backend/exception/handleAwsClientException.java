package com.cloudBalance.Backend.exception;

public class handleAwsClientException extends RuntimeException {
    public handleAwsClientException(String message) {
        super(message);
    }
}
