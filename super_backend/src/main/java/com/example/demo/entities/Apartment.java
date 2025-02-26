package com.example.demo.entities;

import jakarta.persistence.*;
import lombok.Data;

import java.util.Set;
//todo add join tables,define to many to many and test
@Data
@Entity(name = "apartment")
public class Apartment {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Long id;
    @Column
    Integer apartmentNumber;
    @JoinTable
    @ManyToMany
    Set<User> tenants;
    @JoinColumn(name = "current_lease_id", referencedColumnName = "id")
    @OneToOne
    Lease currentLease;
    @JoinTable
    @ManyToMany
    Set<Lease> previousLeases;
    @JoinTable
    @ManyToMany
    Set<Door> doors;
}
