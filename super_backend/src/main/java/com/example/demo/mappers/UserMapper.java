package com.example.demo.mappers;

import com.example.demo.dto.UserDTO;
import com.example.demo.entities.User;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface UserMapper {

    User maptoUser(UserDTO dto);
    UserDTO mapToUserDTO(User entity);

}
