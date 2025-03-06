package com.example.demo.services;

import com.example.demo.dto.request.LoginRequest;
import com.example.demo.dto.request.RegisterUserRequest;
import com.example.demo.dto.response.LoginReponse;
import com.example.demo.entities.Role;
import com.example.demo.entities.User;
import com.example.demo.security.jwt.JwtUtils;
import com.example.demo.security.services.UserDetailsImpl;
import com.example.demo.util.enums.RoleType;
import jakarta.transaction.Transactional;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Slf4j
@Service
public class AuthServiceImpl implements AuthService{

    private final JwtUtils jwtUtils;

    private final AuthenticationManager authenticationManager;

    private final BCryptPasswordEncoder encoder;

    private final RoleService roleService;

    private final UserService userService;

    public AuthServiceImpl(JwtUtils jwtUtils, AuthenticationManager authenticationManager, RoleService roleService, UserService userService) {
        this.jwtUtils = jwtUtils;
        this.authenticationManager = authenticationManager;
        this.encoder = new BCryptPasswordEncoder();
        this.roleService = roleService;
        this.userService = userService;
    }

    @Transactional
    @Override
    public LoginReponse login(LoginRequest request) {

        Authentication auth = authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(request.getUsername(), request.getPassword()));

        SecurityContextHolder.getContext().setAuthentication(auth);

        UserDetailsImpl userDetails = (UserDetailsImpl) auth.getPrincipal();

        String token = jwtUtils.generateJwtToken(userDetails);

        List<String> roles = userDetails.getAuthorities().stream().map(GrantedAuthority::getAuthority).toList();

        return LoginReponse.builder()
                .username(userDetails.getUsername())
                .email(userDetails.getEmail())
                .roles(roles)
                .accessToken(token)
                .tokenType("Bearer ")
                .build();
    }

    @Transactional
    @Override
    public User register(RegisterUserRequest request) {
        if (userService.existsByUsername(request.getUsername())) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Username already registered");
        }

        if (userService.existsByEmail(request.getEmail())) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Email already registered");
        }

        // generate bcrypt password
        String hashedPassword = encoder.encode(request.getPassword());

        User user = new User();
        user.setUsername(request.getUsername());
        user.setEmail(request.getEmail());
        user.setPassword(hashedPassword);
        user.setName(request.getName());

//        Temporary hard coded roles
        Role adminRole = roleService.findByName(RoleType.ADMIN);
        Role tenantRole = roleService.findByName(RoleType.TENANT);
        Set<Role> roles = new HashSet<>();
        roles.add(adminRole);
        roles.add(tenantRole);
        user.setRoles(roles);

        // save user
        return userService.save(user);
    }

}
