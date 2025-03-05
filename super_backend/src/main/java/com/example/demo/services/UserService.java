package com.example.demo.services;

import com.example.demo.dto.UserDTO;
import com.example.demo.entities.User;

import java.util.List;

public interface UserService {

    User saveUser(UserDTO userDTO);


    List<User> getAllUsers();

    User getUser(Long id);

//    Optional<User> getUserbyUsername(String username);
}
