package com.example.demo.controller;

import com.example.demo.dto.DoorCodeDTO;
import com.example.demo.entities.DoorCode;
import com.example.demo.mappers.DoorCodeMapper;
import com.example.demo.services.EntryCodeService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


@RestController
@RequestMapping("")
@RequiredArgsConstructor
public class DoorCodeController {

    private final EntryCodeService entryCodeService;

    private final DoorCodeMapper doorCodeMapper;

    @Operation(
            summary = "Returns the door code created by the user",
            description = "Retrieves the door code associated with the specified user ID and door ID. If the user does not have any door codes, a 404 response is returned.",
            responses = {
                    @ApiResponse(responseCode = "200", description = "Successfully retrieved the list of door codes.",
                            content = @Content(mediaType = "application/json", schema = @Schema(implementation = DoorCodeDTO.class))),
                    @ApiResponse(responseCode = "404", description = "The door code does not exist")
            }
    )
    @GetMapping("users/{userId}/doors/{doorId}/door-codes")
    public ResponseEntity<DoorCodeDTO> getDoorCodeOfUser(@PathVariable Long userId, @PathVariable Long doorId) {
        DoorCode doorCode = this.entryCodeService.getDoorCodeOfUser(userId, doorId);
        DoorCodeDTO doorCodeDTO = (DoorCodeDTO) doorCodeMapper.mapToDoorCodeDTO(doorCode);
        return ResponseEntity.ok(doorCodeDTO);
    }

    @Operation(
            summary = "Creates a new door code for a tenant",
            description = "Generates a new door code for the specified user (tenant). It is a doorcode for the door with the provided door ID. The created door code is associated with the user and returned in the response.",
            responses = {
        @ApiResponse(responseCode = "201", description = "Successfully created a new door code.",
                content = @Content(mediaType = "application/json", schema = @Schema(implementation = DoorCodeDTO.class))),
        @ApiResponse(responseCode = "404", description = "The specified user does not exist."),
        @ApiResponse(responseCode = "404", description = "The door does not exist.")
    }
)
    @PostMapping(path = "users/{userId}/door/{doorId}/door-codes")
    public ResponseEntity<DoorCodeDTO> createDoorCodeForTenant(@PathVariable Long userId, @PathVariable Long doorId){
        DoorCode code = this.entryCodeService.createDoorCodeForTenant(userId, doorId);

        DoorCodeDTO doorCodeDTO = (DoorCodeDTO) doorCodeMapper.mapToDoorCodeDTO(code);

        return ResponseEntity.status(HttpStatus.CREATED).body(doorCodeDTO);
    }

    @Operation(
            summary = "Deletes the door code of a tenant",
            description = "Removes the door code associated with the specified user and door. "
                    + "if the doorcode does not exist, no action is taken.",
            responses = {
                    @ApiResponse(responseCode = "204", description = "Successfully deleted the door code.")
            }
    )
    @DeleteMapping(path = "users/{userId}/door/{doorId}/door-codes")
    public ResponseEntity<?> deleteDoorCode(@PathVariable Long userId , @PathVariable Long doorId){

        this.entryCodeService.deleteEntryCodeByUserAndByDoor(userId, doorId);

        return new ResponseEntity<>(HttpStatus.NO_CONTENT);

    }
}
