package com.example.demo.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Data;

import java.time.ZonedDateTime;

@Data
public abstract class EntryCodeDTO {
    Long id;

    String code;

    @JsonFormat(pattern = "YYYY-MM-DD'T'HH:mm:ss.SSSZ")
    ZonedDateTime expireDate;
}
