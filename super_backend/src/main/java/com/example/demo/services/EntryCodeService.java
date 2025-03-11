package com.example.demo.services;

import com.example.demo.dto.ParkingCodeRequest;
import com.example.demo.entities.DoorCode;
import com.example.demo.entities.ParkingCode;
import org.springframework.web.server.ResponseStatusException;

import java.util.Set;


public interface EntryCodeService {

    DoorCode createDoorCodeForTenant(Long userId,  Long doorId);

    DoorCode getDoorCodeOfUser(Long userId, Long doorId) throws ResponseStatusException;

    void deleteEntryCode(Long doorCodeId);

    void deleteEntryCodeByUserAndByDoor(Long userId, Long doorId);

    Set<ParkingCode> getParkingCodeOfUser(Long userId, Long doorId) throws ResponseStatusException;

    ParkingCode createParkingCodeForTenant(Long userId, Long doorId, ParkingCodeRequest request) throws ResponseStatusException;

    Set<ParkingCode> getAllValidParkingCodesByDoor(Long doorId);
 }
