package com.example.demo.dto;

import java.util.List;

import lombok.*;

import com.example.demo.util.enums.RoleType;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class UserDTO {

    private Long id;

    private String username;

    private String email;

    private String name;

    private List<RoleType> roles;
}
