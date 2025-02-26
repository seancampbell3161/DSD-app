package com.example.demo.controller;

import com.example.demo.dto.UserDTO;
import com.example.demo.entities.User;
import com.example.demo.services.UserServiceImpl;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/users")
@RequiredArgsConstructor
public class UserController {

    private final UserServiceImpl userService;

    @Operation( summary = "Get all users")
    @GetMapping
    public List<UserDTO> getUsers() {
        return userService.getAllUsers();
    }

     @Operation(
        summary = "Create a new user",
        description = "Adds a user to the database",
        responses = {
            @ApiResponse(responseCode = "200", description = "User created",
                content = @Content(mediaType = "application/json", schema = @Schema(implementation = UserDTO.class))),
            @ApiResponse(responseCode = "400", description = "Invalid input")
        }
    )
    @PostMapping(path = "/createUser")
    public UserDTO createUser(@RequestBody UserDTO user) {
        return userService.saveUser(user);
    }
}
