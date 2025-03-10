package com.example.demo.controller;

import com.dropbox.sign.ApiException;
import com.example.demo.utils.Error;
import lombok.extern.slf4j.Slf4j;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.util.NoSuchElementException;

@Slf4j
@RestControllerAdvice
public class GlobalControllerHandler {

    @ExceptionHandler({NoSuchElementException.class, EmptyResultDataAccessException.class})
    public ResponseEntity<Error> EmptyResultDataAccessException(EmptyResultDataAccessException noSuchElementException) {
        Error error = new Error(noSuchElementException, "Request body input in request does not match any records in database");
        log.error("validation exception thrown: {}", error);
        return new ResponseEntity<>(error, HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(ApiException.class)
    public ResponseEntity<Error> apiException(ApiException apiException) {
        Error error = new Error(apiException, "dropbox request failed. Please review stack trace");
        log.error("api exception threw: {}", error);
        return new ResponseEntity<>(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }

    @ExceptionHandler(Exception.class)
    public ResponseEntity<Error> genericException(Exception exception) {
        Error error = new Error(exception, "An unexpected error occurred. Please report to dev team");
        log.error("unchecked exception thrown: {}", error);
        return new ResponseEntity<>(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
}
