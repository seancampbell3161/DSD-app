package com.example.demo.controller;

import com.example.demo.dto.LeaseSignRequestDTO;
import com.example.demo.dto.MetaData;
import com.example.demo.services.LeaseManagementDropBoxImpl;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/document")
@RequiredArgsConstructor
public class DocumentManagementController {
    final LeaseManagementDropBoxImpl leaseManagementDropBox;

    @PostMapping(path = "/sendSignatureRequest", consumes = MediaType.MULTIPART_FORM_DATA_VALUE, produces = "application/json")
    ResponseEntity<?> sendLeaseSignatureRequest(@RequestPart("file") MultipartFile file, @RequestPart("leaseSignRequest") LeaseSignRequestDTO leaseSignRequestDTO, @RequestPart("metadata") MetaData metaData) {
        leaseSignRequestDTO.setFile(file);
        leaseSignRequestDTO.setMetaData(metaData);
        return new ResponseEntity<>(leaseManagementDropBox.createLeaseSignatureRequest(leaseSignRequestDTO), HttpStatus.OK);
    }
}
