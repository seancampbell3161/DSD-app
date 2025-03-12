package com.example.demo.services;

import com.example.demo.entities.Role;
import com.example.demo.utils.enums.RoleType;


public interface RoleService {

    Role findByName(RoleType roleType);
}
