package com.example.demo.services;

import com.example.demo.entities.Door;
import com.example.demo.util.enums.DoorStatus;

public interface DoorService {

    Door getDoor(Long id);

    DoorStatus updateDoorStatus(DoorStatus doorStatus, Long id);
}
