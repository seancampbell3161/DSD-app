package com.example.demo.dto;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.Getter;
import lombok.NonNull;
import lombok.Setter;

@Getter
@Setter
@JsonIgnoreProperties(ignoreUnknown = true)
public class UserPojo {
    @NonNull
    String username;
    @NonNull
    String password;
    @NonNull
    Long apartmentNumber;
    @NonNull
    String name;
}
