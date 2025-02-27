package com.example.demo.controller;

import com.example.demo.dto.DoorCodeDTO;
import com.example.demo.dto.UserDTO;
import com.example.demo.services.UserServiceImpl;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.ArraySchema;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;
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
    @PostMapping(path = "")
    public UserDTO createUser(@RequestBody UserDTO user) {
        return userService.saveUser(user);
    }

    @GetMapping("/{id}/door-codes")
    @Operation(
            summary = "Returns the door codes created by the user",
            description = "Retrieves a list of door codes associated with the specified user ID. "
                    + "If the user does not have any door codes, a 404 response is returned.",
            responses = {
                    @ApiResponse(responseCode = "200", description = "Successfully retrieved the list of door codes.",
                    content = @Content(mediaType = "application/json", array = @ArraySchema(schema = @Schema(implementation = DoorCodeDTO.class)))),
                    @ApiResponse(responseCode = "404", description = "The user does not have any door codes or does not exist.")
            }
    )
    public ResponseEntity<List<DoorCodeDTO>> getDoorCodesOfUser(@PathVariable Long id) {
        List<DoorCodeDTO> doorCodesSet = this.userService.getDoorCodesOfUser(id);
        if (doorCodesSet == null || doorCodesSet.isEmpty()) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "This user does not have door codes");
        }
        return ResponseEntity.ok(doorCodesSet);
    }
}
