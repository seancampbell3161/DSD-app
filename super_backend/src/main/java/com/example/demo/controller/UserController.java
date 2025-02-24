package com.example.demo.controller;

import com.example.demo.dto.UserPojo;
import com.example.demo.entities.User;
import com.example.demo.services.UserServiceImpl;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
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
    @Operation( summary = "Get all users")
    @GetMapping
    public List<User> getUsers() {
        return userService.getAllUsers();
    }

     @Operation(
        summary = "Create a new user",
        description = "Adds a user to the database",
        responses = {
            @ApiResponse(responseCode = "200", description = "User created",
                content = @Content(mediaType = "application/json", schema = @Schema(implementation = User.class))),
            @ApiResponse(responseCode = "400", description = "Invalid input")
        }
    )
    @PostMapping(path = "/createUser")
    public User createUser(@RequestBody UserPojo user) {
        return userService.saveUser(user);
    }
}
