package com.example.demo.services;

import com.example.demo.entities.DoorCode;

public interface DoorCodeService {

    DoorCode createDoorCode(Long userId, Long doorId);
}
