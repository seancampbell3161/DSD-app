package com.example.demo.services;

import com.example.demo.dto.request.LoginRequest;
import com.example.demo.dto.request.RegisterUserRequest;
import com.example.demo.dto.response.LoginReponse;
import com.example.demo.entities.User;

public interface AuthService {

    LoginReponse login(LoginRequest request);

    User register(RegisterUserRequest request);


}
