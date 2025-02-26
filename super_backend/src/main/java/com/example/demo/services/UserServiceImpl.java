package com.example.demo.services;

import com.example.demo.dto.UserDTO;
import com.example.demo.entities.User;
import com.example.demo.mappers.UserMapper;
import com.example.demo.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
@Service
@RequiredArgsConstructor
public class UserServiceImpl implements userservice{

    private final UserRepository userRepository;

    private final UserMapper mapper;



    @Override
    public UserDTO saveUser(UserDTO userDTO) {

        User user = mapper.userDTOtoUser(userDTO);

        return mapper.userToUserDTO(userRepository.save(user));
    }

    public List<UserDTO> getAllUsers() {

        List<User> userList = userRepository.findAll();

        return userList.stream().map(mapper::userToUserDTO).toList();
    }
}
