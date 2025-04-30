package com.cloudBalance.Backend.exception;

import lombok.extern.slf4j.Slf4j;
import org.springframework.dao.DataAccessException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.jdbc.BadSqlGrammarException;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authorization.AuthorizationDeniedException;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import software.amazon.awssdk.core.exception.SdkException;
import software.amazon.awssdk.services.ec2.model.Ec2Exception;
import software.amazon.awssdk.services.sts.model.StsException;

@Slf4j
@ControllerAdvice
public class GlobalExceptionHandler {
    @ExceptionHandler(UsernameNotFoundException.class)
    public ResponseEntity<String> userNotFound(UsernameNotFoundException ex) {
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(ex.getMessage());
    }

    @ExceptionHandler(UserAlreadyExistException.class)
    public ResponseEntity<String> userAlreadyExist(UserAlreadyExistException ex) {
        return ResponseEntity.status(HttpStatus.CONFLICT).body(ex.getMessage());
    }

    @ExceptionHandler(BadCredentialsException.class)
    public ResponseEntity<String> badCredentials(BadCredentialsException ex) {
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(ex.getMessage());
    }


    @ExceptionHandler(RoleNotFound.class)
    public ResponseEntity<String> roleNotFound(RoleNotFound ex) {
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(ex.getMessage());
    }

    @ExceptionHandler(BlackListTokenException.class)
    public ResponseEntity<String> blackListTokenException(BlackListTokenException ex) {
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(ex.getMessage());
    }

    @ExceptionHandler(InvalidTokenException.class)
    public ResponseEntity<String> invalidTokenException(InvalidTokenException ex) {
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(ex.getMessage());
    }

    @ExceptionHandler(AccountAlreadyExistsException.class)
    public ResponseEntity<String> accountAlreadyExistsException(AccountAlreadyExistsException ex) {
        return ResponseEntity.status(HttpStatus.CONFLICT).body(ex.getMessage());
    }

    @ExceptionHandler(UserNotFound.class)
    public ResponseEntity<String> userNotFound(UserNotFound ex) {
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(ex.getMessage());
    }

    @ExceptionHandler(AuthorizationDeniedException.class)
    public ResponseEntity<String> authorizationDeniedException(AuthorizationDeniedException ex) {
        return ResponseEntity.status(HttpStatus.FORBIDDEN).body(ex.getMessage());
    }

    @ExceptionHandler(AccountNotFound.class)
    public ResponseEntity<String> accountNotFound(AccountNotFound ex) {
        return ResponseEntity.status(HttpStatus.FORBIDDEN).body(ex.getMessage());
    }

    @ExceptionHandler(StsException.class)
    public ResponseEntity<String> stsException(StsException ex) {
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(ex.awsErrorDetails().errorCode());
    }

    @ExceptionHandler(SnowflakeColumnsNotFound.class)
    public ResponseEntity<String> snowflakeColumnSNotFoundException(SnowflakeColumnsNotFound ex) {
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(ex.getMessage());
    }

    @ExceptionHandler(handleAwsClientException.class)
    public ResponseEntity<String> awsClientException(handleAwsClientException ex){
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(ex.getMessage());
    }

    @ExceptionHandler(SnowflakeException.class)
    public ResponseEntity<String> snowflakeExceptions(SnowflakeException ex){
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(ex.getMessage());
    }

    @ExceptionHandler(BadSqlGrammarException.class)
    public ResponseEntity<String> badSql(BadSqlGrammarException ex){
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Invalid input");
    }

    @ExceptionHandler(DataAccessException.class)
    public ResponseEntity<String> dataAccessException(DataAccessException ex){
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Not able to access data");
    }

    @ExceptionHandler(Ec2Exception.class)
    public ResponseEntity<String> ec2Exception(Ec2Exception ex){
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Unable to get Ec2 Data");
    }

    @ExceptionHandler(SdkException.class)
    public ResponseEntity<String> sdkException(SdkException ex){
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Server Error");
    }

    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<String> methodArgumentNotValidException(MethodArgumentNotValidException ex){
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Invalid input");
    }


//    @ExceptionHandler(Exception.class)
//    public ResponseEntity<String> globalHandler(Exception ex){
//        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(ex.getMessage());
//    }

}
