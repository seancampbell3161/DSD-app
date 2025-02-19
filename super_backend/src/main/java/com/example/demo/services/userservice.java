package com.example.demo.services;

import com.example.demo.dto.UserPojo;
import com.example.demo.entities.User;

public interface userservice {
    User saveUser(UserPojo userPojo);
}
