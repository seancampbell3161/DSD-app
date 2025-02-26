package com.example.demo.dto;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.Data;
import lombok.NonNull;

@Data
@JsonIgnoreProperties(ignoreUnknown = true)
public class UserDTO {
    @NonNull
    String username;
    @NonNull
    String password;
    @NonNull
    String email;
    @NonNull
    String name;
}
