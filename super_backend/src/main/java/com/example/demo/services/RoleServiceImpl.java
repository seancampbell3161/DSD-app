package com.example.demo.services;

import com.example.demo.entities.Role;
import com.example.demo.repository.RoleRepository;
import com.example.demo.util.enums.RoleType;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
public class RoleServiceImpl implements RoleService{

    private final RoleRepository roleRepository;

    @Override
    public Role findByName(RoleType roleType) {
        return roleRepository.findByName(roleType).orElseThrow(() -> new RuntimeException("Error: Role is not found."));
    }
}
