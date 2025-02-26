package com.example.demo.entities;

import jakarta.persistence.*;
import lombok.Data;

import java.time.ZonedDateTime;
//todo test the user column
@Data
@Entity
public class DoorCode {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Long id;
    @OneToMany
    @JoinColumn(name = "users_id", referencedColumnName = "id")
    User issuedBy;
    @Column
    String code;
    @Column
    ZonedDateTime expireDate;
}
