package com.example.demo.entities;

import com.example.demo.utils.enums.RoleType;
import jakarta.persistence.*;
import jakarta.validation.constraints.Email;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@Entity
@AllArgsConstructor
@NoArgsConstructor(force = true)
@Table(name = "users")
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Long id;

    @Column(nullable = false, unique = true)
    final String username;

    @Column(nullable = false)
    final String password;
    @Email(message = "Email format should be valid")
    @Column(unique = true, nullable = false)
    final String email;

    @Column(nullable = false)
    final String name;

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
    List<DoorCode> issuedDoorCodes;

    @OneToOne(mappedBy = "user")
    Tenant tenantProfile;
}
