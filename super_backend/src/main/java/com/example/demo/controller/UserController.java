package com.example.demo.controller;

import com.example.demo.dto.UserPojo;
import com.example.demo.entities.User;
import com.example.demo.services.UserServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/users")
public class UserController {
    private final UserServiceImpl userService;
    @Autowired
    public UserController(UserServiceImpl userService) {
        this.userService = userService;
    }

    @GetMapping
    public List<User> getUsers() {
        return userService.getAllUsers();
    }

    @PostMapping(path = "/createUser")
    public User createUser(@RequestBody UserPojo user) {
        return userService.saveUser(user);
    }
}
