package com.example.demo.entities;

import jakarta.persistence.*;
import lombok.Data;
import java.util.List;
import java.util.Set;

@Data
@Entity
@Table(name = "buildings")
public class Building {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Long id;

    @OneToMany(mappedBy = "building")
    List<Apartment> apartments;

    @OneToMany(mappedBy="building")
    List<Door> doors;

    @OneToMany(mappedBy = "building")
    Set<Parking> parkings;
}
