package com.example.demo.services;

import com.example.demo.dto.request.LoginRequest;
import com.example.demo.dto.request.RegisterUserRequest;
import com.example.demo.dto.response.LoginReponse;

public interface AuthService {

    LoginReponse login(LoginRequest request);

    void register(RegisterUserRequest request);


}
