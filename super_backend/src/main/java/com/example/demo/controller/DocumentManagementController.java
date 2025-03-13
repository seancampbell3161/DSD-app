package com.example.demo.controller;

import com.dropbox.sign.ApiException;
import com.dropbox.sign.model.SignatureRequestGetResponse;
import com.example.demo.dto.LeaseSignRequestDTO;
import com.example.demo.dto.MetaData;
import com.example.demo.services.LeaseManagementDropBoxImpl;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.parameters.RequestBody;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.nio.file.Files;
import java.nio.file.Path;

@Slf4j
@RestController
@RequestMapping("/document")
@RequiredArgsConstructor
public class DocumentManagementController {
    final LeaseManagementDropBoxImpl leaseManagementDropBox;
    //todo create callback to receive notification about statuses.
    @Operation(
            summary = "send doc request via dropbox signature services",
            description = "sends signature request and saves to database for a valid user",
            requestBody = @RequestBody(
                    content = @Content(
                            mediaType = MediaType.MULTIPART_FORM_DATA_VALUE
                    )
            ),
            responses = {
                    @ApiResponse(responseCode = "200", description = "lease successfully sent",
                            content = @Content(mediaType = "application/json", schema = @Schema(implementation = SignatureRequestGetResponse.class))),
                    @ApiResponse(responseCode = "400", description = "Invalid input", content = @Content(mediaType = "application/json", schema = @Schema(implementation = Error.class))),
                    @ApiResponse(responseCode = "500", description = "server error", content = @Content(mediaType = "application/json", schema = @Schema(implementation = Error.class))),
            }
    )
    @PostMapping(path = "/sendSignatureRequest", consumes = MediaType.MULTIPART_FORM_DATA_VALUE, produces = "application/json")
    ResponseEntity<SignatureRequestGetResponse> sendLeaseSignatureRequest(@RequestPart("file") @Schema(type = "string", format = "binary") MultipartFile file, @Parameter(description = "all other details", required = true) @RequestPart("leaseSignatureRequestDetails") LeaseSignRequestDTO leaseSignRequestDTO, @Parameter(description = "meta data about the document", required = true) @RequestPart("metaData") MetaData metaData) throws Exception {
        Path document;
        document = Files.createTempFile("lease", ".tmp");
        file.transferTo(document);
        leaseSignRequestDTO.setFile(document.toFile());
        leaseSignRequestDTO.setMetaData(metaData);
        SignatureRequestGetResponse body = leaseManagementDropBox.createLeaseSignatureRequest(leaseSignRequestDTO);
        return new ResponseEntity<>(body, HttpStatus.OK);
    }
     @Operation(
            summary = "send request to cancel, needs to wait for a callback",
            description = "uses external id from dropbox to send request to cancel to dropbox"
            ,
            responses = {
                    @ApiResponse(responseCode = "200", description = "notification received, pending"),
                    @ApiResponse(responseCode = "4XX", description = "bad request", content = @Content(mediaType = "application/json", schema = @Schema(implementation = Error.class))),
            }
    )
    @PostMapping(path = "/sendRequestToCancel")
    ResponseEntity<?> sendLeaseSignatureRequest(@Parameter String externalId) throws ApiException {
        leaseManagementDropBox.cancelLeaseSignatureRequest(externalId);
        return new ResponseEntity<>(HttpStatus.OK);
    }
    @Operation(
            summary = "get signature status",
            description = "uses external id from dropbox to pull"
            ,
            responses = {
                    @ApiResponse(responseCode = "200", description = "lease status received",
                            content = @Content(mediaType = "application/json", schema = @Schema(implementation = SignatureRequestGetResponse.class))),
                    @ApiResponse(responseCode = "4XX", description = "bad request", content = @Content(mediaType = "application/json", schema = @Schema(implementation = Error.class))),
            }
    )
    @GetMapping(path = "/getStatus", consumes = "application/json", produces = "application/json")
    ResponseEntity<SignatureRequestGetResponse> getLeaseSignatureStatus(@Parameter String externalId) throws ApiException {
        return new ResponseEntity<>(leaseManagementDropBox.getLeaseStatus(externalId), HttpStatus.OK);
    }
}
