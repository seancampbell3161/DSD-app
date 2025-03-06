package com.example.demo.controller;

import com.example.demo.dto.UserDTO;
import com.example.demo.entities.User;
import com.example.demo.mappers.UserMapper;
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

    private final UserMapper userMapper;


    @Operation( summary = "Get all users")
    @GetMapping
    public List<UserDTO> getUsers() {
        List<User> userList = userService.getAllUsers();
        return userList.stream().map(userMapper::userToUserDTO).toList();
    }

//    @Operation(
//            summary = "Create a new user",
//            description = "Adds a user to the database",
//            responses = {
//                    @ApiResponse(responseCode = "200", description = "User created",
//                            content = @Content(mediaType = "application/json", schema = @Schema(implementation = UserDTO.class))),
//                    @ApiResponse(responseCode = "400", description = "Invalid input")
//            }
//    )
//    @PostMapping(path = "")
//    public UserDTO createUser(@RequestBody UserDTO user) {
//        User newUser = userService.saveUser(user);
//        return userMapper.userToUserDTO(newUser);
//    }



}
