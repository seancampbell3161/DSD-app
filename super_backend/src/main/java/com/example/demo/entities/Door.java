package com.example.demo.entities;

import com.example.demo.util.enums.DoorStatus;
import jakarta.persistence.*;
import lombok.Data;


import java.util.Set;
@Data
@Entity
@Table(name = "doors")
public class Door {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Long id;

    @Enumerated
    DoorStatus doorStatus;

    @ManyToMany
    @JoinTable(name = "door_codes_doors",
            joinColumns = @JoinColumn(name = "door_id"),
            inverseJoinColumns = @JoinColumn(name = "door_codes_id")
    )
    Set<DoorCode> doorCodes;

    @ManyToMany(mappedBy = "doors")
    Set<User> allowedUsers;

    @ManyToOne
    @JoinColumn(name = "apartment_id")
    Apartment apartment;

    @ManyToOne
    @JoinColumn(name = "building_id")
    Building building;
}
