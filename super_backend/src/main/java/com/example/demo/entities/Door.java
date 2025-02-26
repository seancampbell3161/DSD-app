package com.example.demo.entities;

import com.example.demo.util.enums.DoorStatus;
import jakarta.persistence.*;
import lombok.Data;
import org.hibernate.annotations.JdbcTypeCode;
import org.hibernate.type.SqlTypes;

import java.util.Set;
//todo  review setup
@Data
@Entity(name = "door")
public class Door {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Long id;
    @Enumerated
    DoorStatus doorStatus;
    @Column(columnDefinition = "doorCodes[]")
    @JdbcTypeCode(SqlTypes.ARRAY)
    Set<DoorCode> doorCodes;
    @Column(columnDefinition = "usersAllowedToOpen[]")
    @JdbcTypeCode(SqlTypes.ARRAY)
    Set<User> allowedToOpen;
}
