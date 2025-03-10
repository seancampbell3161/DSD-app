package com.example.demo.utils;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NonNull;

@Data
@Builder
@AllArgsConstructor
public class Error {
    String reason = "developer did not set reason for failure";
    String errorMessage = "no error message was set";
    StackTraceElement[] stackTrace;

    public Error(@NonNull Exception exception, @NonNull String message) {
        this.errorMessage = exception.getMessage();
        this.stackTrace = exception.getStackTrace();
        this.reason = message;
    }

}
