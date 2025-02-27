package com.example.demo.dto;

import lombok.Data;
import java.time.ZonedDateTime;

@Data
public class DoorCodeDTO {
    String code;

    ZonedDateTime expireDate;
}
