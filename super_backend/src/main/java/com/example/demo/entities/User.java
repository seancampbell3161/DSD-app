package com.example.demo.entities;

import jakarta.persistence.*;
import jakarta.validation.constraints.Email;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.HashSet;
import java.util.List;
import java.util.Set;

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
    String username;

    @Column(nullable = false)
    String password;
    @Email(message = "Email format should be valid")
    @Column(unique = true, nullable = false)
    String email;

    @Column(nullable = false)
    String name;

    @ManyToMany(fetch = FetchType.LAZY)
    @JoinTable(name = "users_roles",
            joinColumns = @JoinColumn(name = "user_id"),
            inverseJoinColumns = @JoinColumn(name = "role_id"))
    private Set<Role> roles = new HashSet<>();

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

    @OneToOne(mappedBy = "user")
    Tenant tenantProfile;
}
