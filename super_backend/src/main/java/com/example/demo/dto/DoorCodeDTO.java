package com.example.demo.dto;

import lombok.Data;
import java.time.ZonedDateTime;

@Data
public class DoorCodeDTO {

    Long id;

    String code;

    ZonedDateTime expireDate;
}
