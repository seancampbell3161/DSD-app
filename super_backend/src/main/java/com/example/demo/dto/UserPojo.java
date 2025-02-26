package com.example.demo.dto;

import com.example.demo.entities.Apartment;
import com.example.demo.util.enums.RoleType;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.Data;
import lombok.NonNull;

import java.util.List;

@Data
@JsonIgnoreProperties(ignoreUnknown = true)
public class UserPojo {
    @NonNull
    String username;
    @NonNull
    String password;
    @NonNull
    List<Apartment> apartments;
    @NonNull
    String name;
    @NonNull
    String email;
    List<RoleType> roles;
}
