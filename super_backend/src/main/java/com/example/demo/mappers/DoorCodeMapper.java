package com.example.demo.mappers;

import com.example.demo.dto.DoorCodeDTO;
import com.example.demo.entities.DoorCode;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface DoorCodeMapper {

    DoorCode doorCodeDTOtoDoorCode(DoorCodeDTO dto);
    DoorCodeDTO doorCodeToDoorCodeDTO(DoorCode entity);
}
