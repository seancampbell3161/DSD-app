package com.example.demo.services;

import com.example.demo.dto.DoorCodeDTO;
import com.example.demo.dto.UserDTO;
import java.util.List;

public interface userservice {
    UserDTO saveUser(UserDTO userDTO);
    List<DoorCodeDTO> getDoorCodesOfUser(Long id);

public interface UserService {
    User saveUser(UserDTO userDTO);

    List<DoorCode> getDoorCodesOfUser(Long id);

}
