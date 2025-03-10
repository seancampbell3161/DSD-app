package com.example.demo.dto;


import com.example.demo.utils.enums.RoleType;
import lombok.*;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class UserDTO {

    private Long id;
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
