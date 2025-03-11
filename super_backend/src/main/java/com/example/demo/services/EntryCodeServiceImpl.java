package com.example.demo.services;

import com.example.demo.dto.ParkingCodeRequest;
import com.example.demo.entities.*;
import com.example.demo.repository.DoorCodeRepository;
import com.example.demo.repository.EntryCodeRepository;
import com.example.demo.repository.ParkingCodeRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.time.ZonedDateTime;
import java.util.Set;

import static com.example.demo.util.DoorCodeUtil.getRandomNumberString;

@Service
@RequiredArgsConstructor
public class EntryCodeServiceImpl implements EntryCodeService {

    private final DoorCodeRepository doorCodeRepository;
    private final ParkingCodeRepository parkingCodeRepository;
    private final UserService userService;
    private final DoorService doorService;
    private final EntryCodeRepository entryCodeRepository;


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
        entryCodeRepository.deleteExpiredDoorCodes(ZonedDateTime.now());
        return doorCodeRepository.findByUserAndDoor(userId,doorId).orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "The door code does not exist"));
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


    @Override
    public Set<ParkingCode> getParkingCodeOfUser(Long userId, Long doorId) {
        entryCodeRepository.deleteExpiredDoorCodes(ZonedDateTime.now());

        return parkingCodeRepository.findByUserAndDoor(userId,doorId);
    }

    @Override
    public ParkingCode createParkingCodeForTenant(Long userId, Long doorId, ParkingCodeRequest request) throws ResponseStatusException {
        Door door = this.doorService.getDoor(doorId);

        if(door.getParking() == null){
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "This door is not a parking door");
        }

        Set<ParkingCode> parkingCodesIssuedByUser = getParkingCodeOfUser(userId,doorId);

        if(parkingCodesIssuedByUser.size() > 3) {
            throw new ResponseStatusException(HttpStatus.FORBIDDEN, "The client has issued more than 3 valid parking codes. Remove one or more parking codes until you have less than 3 before creating new parking codes");
        }

        entryCodeRepository.deleteExpiredDoorCodes(ZonedDateTime.now());
        Set<ParkingCode> totalValidParkingCodesForParking = getAllValidParkingCodesByDoor(doorId);

        if(totalValidParkingCodesForParking.size() > door.getParking().getNumberOfGuestSpots()) {
            throw new ResponseStatusException(HttpStatus.FORBIDDEN, "There are no guest parking spots left at the moment. Try again at a later time");
        }

        User issuedBy = userService.getUser(userId);

        ParkingCode code = ParkingCode.builder()
                .expireDate(ZonedDateTime.now().plusDays(1))
                .door(door)
                .issuedBy(issuedBy)
                .code(getRandomNumberString())
                .numberPlate(request.getNumberPlate())
                .build();

        return parkingCodeRepository.save(code);
    }

    @Override
    public Set<ParkingCode> getAllValidParkingCodesByDoor(Long doorId) {
        entryCodeRepository.deleteExpiredDoorCodes(ZonedDateTime.now());
        return parkingCodeRepository.findParkingCodesByDoor_Id(doorId);
    }

}
