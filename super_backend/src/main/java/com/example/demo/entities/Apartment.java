package com.example.demo.entities;

import jakarta.persistence.*;
import lombok.Data;

import java.util.Set;
@Data
@Entity
@Table(name = "apartments")
public class Apartment {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Long id;

    Integer apartmentNumber;

    @ManyToMany(mappedBy = "apartments")
    Set<User> tenants;

    @OneToMany(mappedBy="apartment")
    Set<Door> doors;

    @ManyToOne
    @JoinColumn(name = "building_id", nullable = false)
    Building building;
}
