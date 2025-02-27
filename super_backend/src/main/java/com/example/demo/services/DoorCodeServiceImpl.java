package com.example.demo.services;

import com.example.demo.entities.Door;
import com.example.demo.entities.DoorCode;
import com.example.demo.entities.User;
import com.example.demo.repository.DoorCodeRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import java.time.ZonedDateTime;
import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class DoorCodeServiceImpl implements DoorCodeService {

    private final DoorCodeRepository doorCodeRepository;

    private final UserService userService;

    private final DoorService doorService;


    @Override
    public DoorCode createDoorCode(Long userId, Long doorId) {
        User user = userService.getUser(userId);
        Door door = doorService.getDoor(doorId);
        List<Door> doorList = new ArrayList<>();
        doorList.add(door);

        DoorCode doorCode = DoorCode.builder()
                .expireDate(ZonedDateTime.now().plusDays(1))
                .issuedBy(user)
                .doors(doorList)
                .code("12345678")
                .build();

        return doorCodeRepository.save(doorCode);
    }
}
