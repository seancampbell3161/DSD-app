package com.example.demo.controller;

import com.example.demo.dto.DoorCodeDTO;
import com.example.demo.entities.DoorCode;
import com.example.demo.mappers.DoorCodeMapper;
import com.example.demo.services.DoorCodeService;
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
@RequestMapping("")
@RequiredArgsConstructor
public class DoorCodeController {

    private final DoorCodeService doorCodeService;

    private final DoorCodeMapper doorCodeMapper;

    @Operation(
            summary = "Returns the door codes created by the user",
            description = "Retrieves a list of door codes associated with the specified user ID. If the user does not have any door codes, a 404 response is returned.",
            responses = {
                    @ApiResponse(responseCode = "200", description = "Successfully retrieved the list of door codes.",
                            content = @Content(mediaType = "application/json", array = @ArraySchema(schema = @Schema(implementation = DoorCodeDTO.class)))),
                    @ApiResponse(responseCode = "404", description = "The user does not have any door codes or does not exist.")
            }
    )
    @GetMapping("users/{id}/door-codes")
    public ResponseEntity<List<DoorCodeDTO>> getDoorCodesOfUser(@PathVariable Long id) {
        List<DoorCode> doorCodesSet = this.doorCodeService.getDoorCodesOfUser(id);
        if (doorCodesSet == null || doorCodesSet.isEmpty()) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "This user does not have door codes");
        }
        List<DoorCodeDTO> doorCodeDTOList = doorCodesSet.stream().map(doorCodeMapper::doorCodeToDoorCodeDTO).toList();
        return ResponseEntity.ok(doorCodeDTOList);
    }

    @Operation(
            summary = "Creates a new door code for a tenant",
            description = "Generates a new door code for the specified user (tenant). It is a doorcode for all the doors connected to the user. The created door code is associated with the user and returned in the response.",
            responses = {
        @ApiResponse(responseCode = "201", description = "Successfully created a new door code.",
                content = @Content(mediaType = "application/json", schema = @Schema(implementation = DoorCodeDTO.class))),
        @ApiResponse(responseCode = "404", description = "The specified user does not exist.")
    }
)
    @PostMapping(path = "{userId}/door-codes")
    public ResponseEntity<DoorCodeDTO> createDoorCodeForTenant(@PathVariable Long userId){
        DoorCode code = this.doorCodeService.createDoorCodeForTenant(userId);

        DoorCodeDTO doorCodeDTO = doorCodeMapper.doorCodeToDoorCodeDTO(code);

        return ResponseEntity.status(HttpStatus.CREATED).body(doorCodeDTO);
    }

    @Operation(
            summary = "Deletes the door code of a tenant",
            description = "Removes the door codes associated with the specified user. "
                    + "If the user does not have door codes, no action is taken.",
            responses = {
                    @ApiResponse(responseCode = "204", description = "Successfully deleted the door code."),
                    @ApiResponse(responseCode = "404", description = "The specified user does not exist.")
            }
    )
    @DeleteMapping(path = "{userId}/door-codes")
    public ResponseEntity<?> deleteDoorCode(@PathVariable Long userId){

        this.doorCodeService.deleteDoorCodeOfTenant(userId);

        return new ResponseEntity<>(HttpStatus.NO_CONTENT);

    }
}
