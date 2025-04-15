package com.cloudBalance.Backend.exception;

public class UserAlreadyExistException extends RuntimeException{
    public UserAlreadyExistException(String email){
        super("User Already Exist with email "+ email);
    }
}
