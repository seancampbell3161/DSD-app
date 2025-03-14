package com.example.demo.entities;

import com.example.demo.util.enums.RoleType;
import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
@Table(name = "roles")
public class Role {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Enumerated(EnumType.STRING)
    @Column(length = 20)
    private RoleType name;

    public Role() {}

    public Role(RoleType name) {
        this.name = name;
    }

}