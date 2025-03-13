package com.example.demo.mappers;


import com.example.demo.dto.ParkingCodeDTO;
import com.example.demo.entities.ParkingCode;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface ParkingCodeMapper {

    ParkingCode mapToParkingCode(ParkingCodeDTO dto);
    ParkingCodeDTO mapToParkingCodeDTO(ParkingCode entity);
}
