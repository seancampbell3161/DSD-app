package com.example.demo.services;

import com.example.demo.dto.request.LoginRequest;
import com.example.demo.dto.response.LoginReponse;
import jakarta.servlet.http.HttpServletResponse;

public interface AuthService {

    LoginReponse login(LoginRequest request, HttpServletResponse response);


}
