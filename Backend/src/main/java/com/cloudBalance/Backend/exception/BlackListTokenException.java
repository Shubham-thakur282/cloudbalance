package com.cloudBalance.Backend.exception;

public class BlackListTokenException extends RuntimeException {
    public BlackListTokenException(String message) {
        super(message);
    }
}
