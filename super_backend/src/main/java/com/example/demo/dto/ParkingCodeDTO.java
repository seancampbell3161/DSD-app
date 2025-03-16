package com.example.demo.dto;

import lombok.Data;
import lombok.EqualsAndHashCode;

@EqualsAndHashCode(callSuper = true)
@Data
public class ParkingCodeDTO extends EntryCodeDTO {
    String numberPlate;
    String guestName;
}
