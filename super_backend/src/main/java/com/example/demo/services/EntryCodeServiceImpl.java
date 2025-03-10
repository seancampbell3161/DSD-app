package com.example.demo.services;

import com.example.demo.entities.Door;
import com.example.demo.entities.DoorCode;
import com.example.demo.entities.User;
import com.example.demo.repository.DoorCodeRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.time.ZonedDateTime;

import static com.example.demo.util.DoorCodeUtil.getRandomNumberString;

@Service
@RequiredArgsConstructor
public class EntryCodeServiceImpl implements EntryCodeService {

    private final DoorCodeRepository doorCodeRepository;

    private final UserService userService;
    private final DoorService doorService;


    @Override
    public DoorCode createDoorCodeForTenant(Long userId, Long doorId) {

        DoorCode existingDoorCode = null;

        try {
             existingDoorCode = getDoorCodeOfUser(userId, doorId);
        }
        catch (ResponseStatusException ignored) {}


        if(existingDoorCode != null) {
            deleteEntryCode(existingDoorCode.getId());
        }

        User user = userService.getUser(userId);
        Door door = doorService.getDoor(doorId);

        DoorCode doorCode = DoorCode.builder()
                .expireDate(ZonedDateTime.now().plusDays(1))
                .issuedBy(user)
                .door(door)
                .code(getRandomNumberString())
                .build();

        return doorCodeRepository.save(doorCode);
    }

    @Override
    public DoorCode getDoorCodeOfUser(Long userId, Long doorId) throws ResponseStatusException {
        ZonedDateTime now = ZonedDateTime.now();

        DoorCode doorCode = doorCodeRepository.findByUserAndDoor(userId,doorId).orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "The door code does not exist"));

        if (now.isAfter(doorCode.getExpireDate())) {
                deleteEntryCode(doorCode.getId());
                throw new ResponseStatusException(HttpStatus.NOT_FOUND, "The door code does not exist");
        }

        return doorCode;
    }

    @Override
    public void deleteEntryCode(Long doorCodeId) {
        this.doorCodeRepository.deleteById(doorCodeId);
    }

    @Transactional
    @Override
    public void deleteEntryCodeByUserAndByDoor(Long userId, Long doorId) {
        doorCodeRepository.deleteByUserAndDoor(doorId,userId);
    }
}
