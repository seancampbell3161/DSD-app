package com.example.demo.controller;

import com.dropbox.sign.model.SignatureRequestGetResponse;
import com.example.demo.dto.LeaseSignRequestDTO;
import com.example.demo.dto.MetaData;
import com.example.demo.services.LeaseManagementDropBoxImpl;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import java.nio.file.Files;
import java.nio.file.Path;

@Slf4j
@RestController
@RequestMapping("/document")
@RequiredArgsConstructor
public class DocumentManagementController {
    final LeaseManagementDropBoxImpl leaseManagementDropBox;

      @Operation(
            summary = "send doc request",
            description = "sends signature request and saves to database for a valid user",
            responses = {
                    @ApiResponse(responseCode = "200", description = "lease successfully sent",
                            content = @Content(mediaType = "application/json", schema = @Schema(implementation = SignatureRequestGetResponse.class))),
                    @ApiResponse(responseCode = "400", description = "Invalid input", content = @Content(mediaType = "application/json", schema = @Schema(implementation = Error.class))),
                    @ApiResponse(responseCode = "500", description = "server error", content = @Content(mediaType = "application/json", schema = @Schema(implementation = Error.class))),
            }
    )
    @PostMapping(path = "/sendSignatureRequest", consumes = MediaType.MULTIPART_FORM_DATA_VALUE, produces = "application/json")
    ResponseEntity<?> sendLeaseSignatureRequest(@RequestPart("file") MultipartFile file, @RequestPart("leaseSignatureRequestDetails") LeaseSignRequestDTO leaseSignRequestDTO, @RequestPart("metaData") MetaData metaData) throws Exception {
        Path document;
        try {
            document = Files.createTempFile("lease", file.getOriginalFilename());
            file.transferTo(document);
            leaseSignRequestDTO.setFile(document.toFile());
        } catch (Exception e) {
            log.error("exception thrown stackTrace:\n {}", e.getStackTrace(), e);
            throw new RuntimeException("file is required");
        }
        leaseSignRequestDTO.setFile(document.toFile());
        leaseSignRequestDTO.setMetaData(metaData);
        SignatureRequestGetResponse body = leaseManagementDropBox.createLeaseSignatureRequest(leaseSignRequestDTO);
        return new ResponseEntity<>(body, HttpStatus.OK);
    }
}
