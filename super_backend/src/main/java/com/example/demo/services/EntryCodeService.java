package com.example.demo.services;

import com.example.demo.entities.DoorCode;
import org.springframework.web.server.ResponseStatusException;


public interface EntryCodeService {

    DoorCode createDoorCodeForTenant(Long userId,  Long doorId);

    DoorCode getDoorCodeOfUser(Long userId, Long doorId) throws ResponseStatusException;

    void deleteEntryCode(Long doorCodeId);

    void deleteEntryCodeByUserAndByDoor(Long userId, Long doorId);
 }
