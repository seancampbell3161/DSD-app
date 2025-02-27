package com.example.demo.services;

import com.example.demo.dto.UserDTO;
import com.example.demo.entities.DoorCode;
import com.example.demo.entities.User;
import com.example.demo.mappers.UserMapper;
import com.example.demo.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.Optional;


@Service
@RequiredArgsConstructor
public class UserServiceImpl implements userservice{

    private final UserRepository userRepository;

    private final UserMapper userMapper;

    @Override
    public User saveUser(UserDTO userDTO) {

        User user = userMapper.userDTOtoUser(userDTO);

        return userRepository.save(user);
    }

    @Override
    public List<DoorCodeDTO> getDoorCodesOfUser(Long id) {
    public List<DoorCode> getDoorCodesOfUser(Long id) {
        Optional<User> user = userRepository.findById(id);

        if(user.isEmpty()){
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "The user does not exist");
        }

        List<DoorCodeDTO> doorCodeDTOlist = user.get().getIssuedDoorCodes().stream().map(doorCodeMapper::doorCodeToDoorCodeDTO).toList();

        return doorCodeDTOlist;
    }

    public List<User> getAllUsers() {
        return userRepository.findAll();
    }
}
