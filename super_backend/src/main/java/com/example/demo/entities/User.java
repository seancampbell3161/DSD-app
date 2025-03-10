package com.example.demo.entities;

import com.example.demo.util.enums.RoleType;
import jakarta.persistence.*;
import lombok.Data;

import java.util.List;

@Data
@Entity
@Table(name = "users")
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Long id;

    @Column(nullable = false, unique = true)
    String username;

    @Column(nullable = false)
    String password;

    @Column(unique = true, nullable = false)
    String email;

    @Column(nullable = false)
    String name;

    @ElementCollection(targetClass = RoleType.class)
    @CollectionTable(name = "users_roles", joinColumns = @JoinColumn(name = "user_id"))
    @Column(name = "role")
    List<RoleType> roles;

    @ManyToMany
    @JoinTable(name = "tenants_apartments",
            joinColumns = @JoinColumn(name = "user_id"),
            inverseJoinColumns = @JoinColumn(name = "apartment_id")
    )
    List<Apartment> apartments;

    @ManyToMany
    @JoinTable(name = "doors_users",
            joinColumns = @JoinColumn(name = "user_id"),
            inverseJoinColumns = @JoinColumn(name = "door_id")
    )
    List<Door> doors;

    @OneToMany(mappedBy = "issuedBy")
    List<EntryCode> issuedEntryCodes;

}
