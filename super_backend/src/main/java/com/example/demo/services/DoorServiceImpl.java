package com.example.demo.services;

import com.example.demo.entities.Door;
import com.example.demo.repository.DoorRepository;
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
        Optional<Door> door = doorRepository.findById(id);

        if(door.isEmpty()){
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "The door does not exist");
        }
        return door.get();
    }
}
