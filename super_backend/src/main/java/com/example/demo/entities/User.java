package com.example.demo.entities;

import com.example.demo.dto.UserPojo;
import com.example.demo.util.enums.RoleType;
import jakarta.persistence.*;
import lombok.Data;
import org.hibernate.annotations.JdbcTypeCode;
import org.hibernate.type.SqlTypes;

import java.util.List;
//todo design. are people in users table only people that signed leases? should we have a status if they are a potential tenant, active tenant, or past tenant?
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
    @Enumerated(EnumType.STRING)
    @Column(columnDefinition = "role_type_enum[]")
    @JdbcTypeCode(SqlTypes.ARRAY)
    List<RoleType> roles;
    //todo add cascade accordingly. should this be mapped one to one? can a tenant be the current lease owner of multiple apartments? It's possible for multiple people to sign a lease for one apartment. Are people who actually signed a lease to an apartment included here?
    @ManyToMany(mappedBy = "users", fetch = FetchType.LAZY)
    List<Apartment> apartments;
    //todo define
    List<Door> doors;


    public User(UserPojo userPojo) {
        this.email = userPojo.getEmail();
        this.password = userPojo.getPassword();
        this.username = userPojo.getUsername();
        this.name = userPojo.getName();
        this.roles = userPojo.getRoles();
        this.apartments = userPojo.getApartments();
    }
}
