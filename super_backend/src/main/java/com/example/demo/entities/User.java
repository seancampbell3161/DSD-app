package com.example.demo.entities;

import com.example.demo.dto.UserPojo;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
@Table(name = "users")
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Long id;
    @Column(nullable = false)
    String username;
    @Column(nullable = false)
    String password;
    @Column(nullable = false)
    Long apartmentNumber;
    @Column(nullable = false)
    String name;

    public User() {
    }

    public User(UserPojo userPojo) {
        this.password = userPojo.getPassword();
        this.username = userPojo.getUsername();
        this.apartmentNumber = userPojo.getApartmentNumber();
        this.name = userPojo.getName();
    }
}
