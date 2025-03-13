package com.example.demo.services;

import com.example.demo.dto.UserDTO;
import com.example.demo.entities.User;

import java.util.List;

public interface UserService {

    User save(User user);

    List<User> getAllUsers();

    User getUser(Long id);

    boolean existsByUsername(String username);

    boolean existsByEmail(String email);

    User getUserbyUsername(String username);
}
