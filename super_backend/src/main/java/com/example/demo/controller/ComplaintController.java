package com.example.demo.controller;

import com.example.demo.dto.request.ComplaintRequest;
import com.example.demo.entities.Complaint;
import com.example.demo.services.ComplaintServiceImpl;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.ExampleObject;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequestMapping("/complaint")
@RestController
@RequiredArgsConstructor
public class ComplaintController {
    final ComplaintServiceImpl complaintService;

    @Operation(summary = "Create a new complaint", description = "extracts username from jwt, need to be logged in", responses = {
            @ApiResponse(responseCode = "201", description = "Complaint created successfully", content = @Content(schema = @Schema(implementation = Complaint.class))),
            @ApiResponse(responseCode = "400", description = "Invalid input")
    })
    @PostMapping
    public ResponseEntity<Complaint> createComplaint(@io.swagger.v3.oas.annotations.parameters.RequestBody(description = "Complaint details", required = true, content = @Content(examples = @ExampleObject(value = "{\"message\": \"This is a complaint message\"}")))
                                                     @RequestBody ComplaintRequest complaintDTO) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String username = authentication.getName();
        Complaint createdComplaint = complaintService.createComplaint(complaintDTO, username);
        return new ResponseEntity<>(createdComplaint, HttpStatus.CREATED);
    }

    @Operation(summary = "Get a complaint by ID", responses = {
            @ApiResponse(responseCode = "200", description = "Complaint retrieved successfully", content = @Content(schema = @Schema(implementation = Complaint.class))),
            @ApiResponse(responseCode = "404", description = "Complaint not found")
    })
    @GetMapping("/{id}")
    public ResponseEntity<Complaint> getComplaintById(@io.swagger.v3.oas.annotations.Parameter(description = "ID of the complaint to retrieve", required = true, example = "1") @PathVariable Long id) {
        Complaint complaint = complaintService.getComplaintById(id);
        return new ResponseEntity<>(complaint, HttpStatus.OK);
    }

    @Operation(summary = "Get all complaints by a user", responses = {
            @ApiResponse(responseCode = "200", description = "Complaints retrieved successfully", content = @Content(schema = @Schema(implementation = Complaint.class, type = "array"))),
            @ApiResponse(responseCode = "404", description = "User not found")
    })
    @GetMapping("/allFrom{username}")
    public ResponseEntity<List<Complaint>> getComplaintById(@io.swagger.v3.oas.annotations.Parameter(description = "Username of the user to retrieve complaints for", required = true, example = "john_doe") @PathVariable String username) {
        List<Complaint> complaints = complaintService.getAllComplaintByUser(username);
        return new ResponseEntity<>(complaints, HttpStatus.OK);
    }

    @Operation(summary = "Get all complaints", responses = {
            @ApiResponse(responseCode = "200", description = "Complaints retrieved successfully", content = @Content(schema = @Schema(implementation = Complaint.class, type = "array")))
    })
    @GetMapping("/all")
    public ResponseEntity<List<Complaint>> getAllComplaints() {
        List<Complaint> complaints = complaintService.getAllComplaints();
        return new ResponseEntity<>(complaints, HttpStatus.OK);
    }

    @Operation(summary = "Update a complaint", responses = {
            @ApiResponse(responseCode = "200", description = "Complaint updated successfully", content = @Content(schema = @Schema(implementation = Complaint.class))),
            @ApiResponse(responseCode = "404", description = "Complaint not found")
    })
    @PutMapping("/{id}")
    public ResponseEntity<Complaint> updateComplaint(@io.swagger.v3.oas.annotations.Parameter(description = "ID of the complaint to update", required = true, example = "1") @PathVariable Long id, @io.swagger.v3.oas.annotations.parameters.RequestBody(description = "Updated complaint details", required = true, content = @Content(examples = @ExampleObject(value = "{\"message\": \"Updated complaint message\",\"status\": \"pending\"}"))) @RequestBody ComplaintRequest complaintRequest) {
        Complaint updatedComplaint = complaintService.updateComplaint(id, complaintRequest);
        return new ResponseEntity<>(updatedComplaint, HttpStatus.OK);
    }

    @Operation(summary = "Delete a complaint", responses = {
            @ApiResponse(responseCode = "204", description = "Complaint deleted successfully"),
            @ApiResponse(responseCode = "404", description = "Complaint not found")
    })
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteComplaint(@io.swagger.v3.oas.annotations.Parameter(description = "ID of the complaint to delete", required = true, example = "1") @PathVariable Long id) {
        complaintService.deleteComplaint(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    @Operation(summary = "Delete all complaints by a user", responses = {
            @ApiResponse(responseCode = "204", description = "Complaints deleted successfully"),
            @ApiResponse(responseCode = "404", description = "User not found")
    })
    @DeleteMapping("allBy/{username}")
    public ResponseEntity<Void> deleteAllComplaint(@io.swagger.v3.oas.annotations.Parameter(description = "Username of the user to delete complaints for", required = true, example = "john_doe") @PathVariable String username) {
        complaintService.deleteAllComplaintsByUser(username);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    @Operation(summary = "Create a new complaint without jwt token for testing purposes", description = "for testing purposes. need to add valid username in header", responses = {
            @ApiResponse(responseCode = "201", description = "Complaint created successfully", content = @Content(schema = @Schema(implementation = Complaint.class))),
            @ApiResponse(responseCode = "400", description = "Invalid input")
    })
    @PostMapping("/test")
    public ResponseEntity<Complaint> createComplainTest(@io.swagger.v3.oas.annotations.parameters.RequestBody(description = "Complaint details", required = true, content = @Content(examples = @ExampleObject(value = "{\"message\": \"This is a complaint message\"}")))
                                                        @RequestBody ComplaintRequest complaintDTO, @io.swagger.v3.oas.annotations.Parameter(name = "username", required = true, description = "username in header for testing purposes") @RequestHeader String username) {

        Complaint createdComplaint = complaintService.createComplaint(complaintDTO, username);
        return new ResponseEntity<>(createdComplaint, HttpStatus.CREATED);
    }
}
