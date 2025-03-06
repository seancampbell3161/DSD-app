package com.example.demo.services;

import com.example.demo.entities.Door;
import com.example.demo.repository.DoorRepository;
import com.example.demo.util.enums.DoorStatus;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class DoorServiceImpl implements DoorService{

    private final DoorRepository doorRepository;

    @Override
    public Door getDoor(Long id) {
        return doorRepository.findById(id).orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "The door does not exist"));
    }

    @Override
    public DoorStatus updateDoorStatus(DoorStatus doorStatus, Long id) {
        Door door = getDoor(id);
        door.setDoorStatus(doorStatus);
        return doorRepository.save(door).getDoorStatus();
    }


}
