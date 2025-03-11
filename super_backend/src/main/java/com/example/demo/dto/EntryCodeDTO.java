package com.example.demo.dto;

import lombok.Data;

import java.time.ZonedDateTime;

@Data
public abstract class EntryCodeDTO {
    Long id;

    String code;

    ZonedDateTime expireDate;
}
