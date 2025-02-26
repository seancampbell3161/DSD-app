package com.example.demo.services;

import com.example.demo.dto.UserDTO;
import com.example.demo.entities.User;

public interface userservice {
    UserDTO saveUser(UserDTO userDTO);
}
