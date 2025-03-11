package com.example.demo.controller;

import com.example.demo.dto.ParkingCodeDTO;
import com.example.demo.dto.ParkingCodeRequest;
import com.example.demo.entities.ParkingCode;
import com.example.demo.mappers.ParkingCodeMapper;
import com.example.demo.services.EntryCodeService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.media.ArraySchema;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Set;

@RestController
@RequestMapping("")
@RequiredArgsConstructor
public class ParkingCodeController {

    private final EntryCodeService entryCodeService;
    private final ParkingCodeMapper parkingCodeMapper;

    @Operation(
            summary = "Retrieve parking codes issued by a user for a specific door",
            description = "Returns a list of valid parking codes issued by a user for a given door. " +
                    "Expired parking codes are automatically removed before retrieving the data.",
            parameters = {
                    @Parameter(name = "userId", description = "The ID of the user", required = true),
                    @Parameter(name = "doorId", description = "The ID of the door", required = true)
            }
    )
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "Successfully retrieved the list of parking codes",
                    content = @Content(array = @ArraySchema(schema = @Schema(implementation = ParkingCodeDTO.class)))),
            @ApiResponse(responseCode = "500", description = "Internal server error")
    })
    @GetMapping("users/{userId}/doors/{doorId}/parking-codes")
    public ResponseEntity<List<ParkingCodeDTO>> getParkingCodeOfUser(@PathVariable Long userId, @PathVariable Long doorId) {
        Set<ParkingCode> parkingCodesSet = this.entryCodeService.getParkingCodeOfUser(userId, doorId);
        List<ParkingCodeDTO> parkingCodeDTOList = new ArrayList<>();

        for(ParkingCode parkingCode : parkingCodesSet){
            ParkingCodeDTO parkingCodeDTO = parkingCodeMapper.mapToParkingCodeDTO(parkingCode);
            parkingCodeDTOList.add(parkingCodeDTO);
        }

        return ResponseEntity.ok(parkingCodeDTOList);
    }

    @Operation(
            summary = "Create a parking code for a tenant",
            description = "Generates a new parking code for a tenant if they meet the parking restrictions. " +
                    "A user can have a maximum of 3 valid parking codes, and the number of guest spots must be available.",
            parameters = {
                    @Parameter(name = "userId", description = "The ID of the user issuing the parking code", required = true),
                    @Parameter(name = "doorId", description = "The ID of the door (linked to parking)", required = true)
            }
    )
    @ApiResponses({
            @ApiResponse(responseCode = "201", description = "Parking code successfully created",
                    content = @Content(schema = @Schema(implementation = ParkingCodeDTO.class))),
            @ApiResponse(responseCode = "400", description = "The door is not a parking door"),
            @ApiResponse(responseCode = "403", description = "User has more than 3 valid parking codes OR no guest parking spots left"),
            @ApiResponse(responseCode = "500", description = "Internal server error")
    })
    @PostMapping(path = "users/{userId}/door/{doorId}/parking-codes")
    public ResponseEntity<ParkingCodeDTO> createParkingCodeForTenant(@PathVariable Long userId, @PathVariable Long doorId, @RequestBody ParkingCodeRequest request){
        ParkingCode code = this.entryCodeService.createParkingCodeForTenant(userId, doorId, request);

        ParkingCodeDTO parkingCodeDTO = parkingCodeMapper.mapToParkingCodeDTO(code);

        return ResponseEntity.status(HttpStatus.CREATED).body(parkingCodeDTO);
    }

    @Operation(
            summary = "Deletes the parking code of a tenant",
            description = "Removes the parking code with the provided id. "
                    + "if the parkingcode does not exist, no action is taken.",
            parameters = {
                    @Parameter(name = "id", description = "the id of the parking code which should be removed", required = true),
            },
            responses = {
                    @ApiResponse(responseCode = "204", description = "Successfully deleted the parking code.")
            }
    )
    @DeleteMapping(path = "parking-codes/{id}")
    public ResponseEntity<?> deleteDoorCode(@PathVariable Long id){

        this.entryCodeService.deleteEntryCode(id);

        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}
