package com.example.demo.services;

import com.example.demo.entities.User;

import java.util.List;

public interface UserService {

    List<User> getAllUsers();

    User getUser(Long id);

//    Optional<User> getUserbyUsername(String username);
}
