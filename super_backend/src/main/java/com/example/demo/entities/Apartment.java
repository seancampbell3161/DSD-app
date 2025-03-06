package com.example.demo.entities;

import jakarta.persistence.*;
import lombok.Data;

import java.util.List;
import java.util.Set;

@Data
@Entity
@Table(name = "apartments")
public class Apartment {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Long id;
    @Column(name = "apartment_number")
    final Integer apartmentNumber;

    @OneToMany(mappedBy = "apartment")
    Set<Door> doors;

    @ManyToOne
    @JoinColumn(name = "building_id", nullable = false)
    Building building;

    @OneToMany(mappedBy = "apartment")
    List<Lease> leaseHistory;

    @ManyToMany(mappedBy = "apartment")
    Set<User> tenants;
}
