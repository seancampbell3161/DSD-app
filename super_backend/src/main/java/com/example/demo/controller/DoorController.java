package com.example.demo.controller;

import com.example.demo.entities.Door;
import com.example.demo.services.DoorService;
import com.example.demo.util.enums.DoorStatus;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/doors")
@RequiredArgsConstructor
public class DoorController {

    private final DoorService doorService;


    @Operation(
            summary = "Get the status of a door",
            description = "Retrieves the current status of a door based on the provided door ID.",
            responses = {
                    @ApiResponse(responseCode = "200", description = "Successfully retrieved door status.",
                            content = @Content(mediaType = "application/json", schema = @Schema(implementation = DoorStatus.class))),
                    @ApiResponse(responseCode = "404", description = "Door not found.")
            }
    )
    @GetMapping("/{doorId}/status")
    public ResponseEntity<DoorStatus> getDoorStatus(@PathVariable Long doorId) {
        Door door = this.doorService.getDoor(doorId);
        return ResponseEntity.ok(door.getDoorStatus());
    }

    @Operation(
            summary = "Update the status of a door",
            description = "Updates the status of a door based on the provided door ID and the 'openTheDoor' parameter. " +
                    "If 'openTheDoor' is true, the door will be unlocked. If false, the door will be locked.",
            responses = {
                    @ApiResponse(responseCode = "200", description = "Successfully updated the door status.",
                            content = @Content(mediaType = "application/json", schema = @Schema(implementation = DoorStatus.class))),
                    @ApiResponse(responseCode = "400", description = "Invalid value for 'openTheDoor' parameter."),
                    @ApiResponse(responseCode = "404", description = "Door not found.")
            }
    )
    @PutMapping("/{doorId}/status")
    public ResponseEntity<DoorStatus> updateDoorStatus(@PathVariable Long doorId, @RequestParam Boolean openTheDoor) {

        DoorStatus doorStatus;

        if(openTheDoor) {
            doorStatus = this.doorService.updateDoorStatus(DoorStatus.UNLOCKED, doorId);
        } else {
            doorStatus = this.doorService.updateDoorStatus(DoorStatus.LOCKED, doorId);
        }

        return ResponseEntity.ok(doorStatus);
    }
}
