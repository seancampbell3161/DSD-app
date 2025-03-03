package com.example.demo.entities;

import com.example.demo.util.enums.DoorStatus;
import jakarta.persistence.*;
import lombok.Data;
import java.util.List;

@Data
@Entity
@Table(name = "doors")
public class Door {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Long id;

    @Enumerated(EnumType.STRING)
    DoorStatus doorStatus;

    @ManyToMany
    @JoinTable(name = "door_codes_doors",
            joinColumns = @JoinColumn(name = "door_id"),
            inverseJoinColumns = @JoinColumn(name = "door_codes_id")
    )
    List<DoorCode> doorCodes;

    @ManyToMany(mappedBy = "doors")
    List<User> allowedUsers;

    @ManyToOne
    @JoinColumn(name = "apartment_id")
    Apartment apartment;

    @ManyToOne
    @JoinColumn(name = "building_id")
    Building building;
}
