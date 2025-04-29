package com.cloudBalance.Backend.exception;

public class SnowflakeColumnsNotFound extends RuntimeException {
    public SnowflakeColumnsNotFound(String message) {
        super(message);
    }
}
