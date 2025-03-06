package com.example.demo.controller;

import java.util.List;

import io.swagger.v3.oas.annotations.Operation;

import lombok.RequiredArgsConstructor;

import org.springframework.web.bind.annotation.*;

import com.example.demo.dto.UserDTO;
import com.example.demo.entities.User;
import com.example.demo.mappers.UserMapper;
import com.example.demo.services.UserServiceImpl;

@RestController
@RequestMapping("/users")
@RequiredArgsConstructor
public class UserController {

    private final UserServiceImpl userService;

    private final UserMapper userMapper;


    @Operation( summary = "Get all users")
    @GetMapping
    public List<UserDTO> getUsers() {
        List<User> userList = userService.getAllUsers();
        return userList.stream().map(userMapper::userToUserDTO).toList();
    }

}
