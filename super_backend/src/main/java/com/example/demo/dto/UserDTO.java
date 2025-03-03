package com.example.demo.dto;

import com.example.demo.util.enums.RoleType;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.Data;
import lombok.NonNull;

import java.util.List;

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
    List<RoleType> roles;
}
