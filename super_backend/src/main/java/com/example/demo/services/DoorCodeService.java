package com.example.demo.services;

import com.example.demo.entities.DoorCode;

import java.util.List;

public interface DoorCodeService {

    DoorCode createDoorCodeForTenant(Long userId);

    List<DoorCode> getDoorCodesOfUser(Long id);

    void deleteDoorCode(Long doorCodeId);

    void deleteDoorCodeOfTenant(Long userId);
    }
