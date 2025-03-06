package com.example.demo.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.Size;
import lombok.Data;
import lombok.NonNull;

import java.io.File;
import java.util.List;
//todo add validation, swagger annotations
@Data
public class LeaseSignRequestDTO {
    @Size(min = 1)
    List<String> signerEmails;
    @NonNull
    Long apartmentNumber;
    @NonNull
    File file;
    @Size(min = 1)
    List<String> ccEmails;
}
