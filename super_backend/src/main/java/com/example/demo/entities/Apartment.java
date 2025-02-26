package com.example.demo.entities;

import jakarta.persistence.*;
import lombok.Data;

import java.util.Set;
//todo add join tables to many to many and test
@Data
@Entity(name = "apartment")
public class Apartment {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Long id;
    @Column
    Integer apartmentNumber;
    @ManyToMany
    Set<User> tenants;
    @JoinColumn(name = "current_lease_id", referencedColumnName = "id")
    @OneToOne
    Lease lease;
    @ManyToMany
    Set<Lease> previousLeases;
    @ManyToMany
    Set<Door> doors;
}
