package com.example.demo.entities;

import jakarta.persistence.*;
import lombok.Data;
import java.util.List;

@Data
@Entity
@Table(name = "apartments")
public class Apartment {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Long id;

    Integer apartmentNumber;

    @ManyToMany(mappedBy = "apartments")
    List<User> tenants;

    @OneToMany(mappedBy="apartment")
    List<Door> doors;

    @ManyToOne
    @JoinColumn(name = "building_id", nullable = false)
    Building building;
}
