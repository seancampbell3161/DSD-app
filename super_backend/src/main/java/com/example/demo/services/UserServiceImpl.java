package com.example.demo.services;

import com.example.demo.dto.UserDTO;
import com.example.demo.entities.User;
import com.example.demo.mappers.UserMapper;
import com.example.demo.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements userservice {

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

    public Page<User> searchUsersWithEmail(String email, int page, int size, String sortParam) {
        Pageable pageable = PageRequest.of(page, size, Sort.by(sortParam).descending());
        return userRepository.findByEmailContainingIgnoreCase(email, pageable);
    }
}
