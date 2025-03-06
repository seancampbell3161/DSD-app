package com.example.demo.services;

import com.example.demo.entities.Role;
import com.example.demo.util.enums.RoleType;

public interface RoleService {

    Role findByName(RoleType roleType);
}
