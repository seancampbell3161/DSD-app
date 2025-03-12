package com.example.demo.services;

import com.example.demo.dto.ParkingCodeRequest;
import com.example.demo.entities.DoorCode;
import com.example.demo.entities.ParkingCode;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;


public interface EntryCodeService {

    DoorCode createDoorCodeForTenant(Long userId,  Long doorId);

    DoorCode getDoorCodeOfUser(Long userId, Long doorId) throws ResponseStatusException;

    void deleteEntryCode(Long doorCodeId);

    void deleteDoorCodeByUserAndByDoor(Long userId, Long doorId);

    List<ParkingCode> getParkingCodeOfUser(Long userId, Long doorId) throws ResponseStatusException;

    ParkingCode createParkingCodeForTenant(Long userId, Long doorId, ParkingCodeRequest request) throws ResponseStatusException;

    List<ParkingCode> getAllValidParkingCodesByDoor(Long doorId);
 }
