package com.example.demo.services;

import com.example.demo.entities.DoorCode;
import com.example.demo.entities.User;
import com.example.demo.repository.DoorCodeRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import java.time.ZonedDateTime;
import java.util.ArrayList;
import java.util.List;

import static com.example.demo.util.DoorCodeUtil.getRandomNumberString;

@Service
@RequiredArgsConstructor
public class DoorCodeServiceImpl implements DoorCodeService {

    private final DoorCodeRepository doorCodeRepository;

    private final UserService userService;


    @Override
    public DoorCode createDoorCodeForTenant(Long userId) {
        User user = userService.getUser(userId);

        if(!user.getIssuedDoorCodes().isEmpty()) {
            for(DoorCode doorCode : user.getIssuedDoorCodes()) {
                deleteDoorCode(doorCode.getId());
            }
        }

        DoorCode doorCode = DoorCode.builder()
                .expireDate(ZonedDateTime.now().plusDays(1))
                .issuedBy(user)
                .doors(new ArrayList<>(user.getDoors()))
                .code(getRandomNumberString())
                .build();

        return doorCodeRepository.save(doorCode);
    }

    @Override
    public List<DoorCode> getDoorCodesOfUser(Long id) {
        User user = this.userService.getUser(id);
        ZonedDateTime now = ZonedDateTime.now();

        List<DoorCode> doorCodeList = user.getIssuedDoorCodes();
        List<DoorCode> filteredList = new ArrayList<>();

        for (DoorCode doorCode : doorCodeList) {
            if (now.isAfter(doorCode.getExpireDate())) {
                deleteDoorCode(doorCode.getId());
            } else {
                filteredList.add(doorCode);
            }
        }
        return  filteredList;
    }

    @Override
    public void deleteDoorCode(Long doorCodeId) {
        this.doorCodeRepository.deleteById(doorCodeId);
    }

    @Override
    public void deleteDoorCodeOfTenant(Long userId) {
        User tenant = userService.getUser(userId);

        for(DoorCode doorCode : tenant.getIssuedDoorCodes()){
            deleteDoorCode(doorCode.getId());
        }
    }
}
