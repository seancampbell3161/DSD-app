package com.example.demo.entities;

import jakarta.persistence.*;
import lombok.Data;

import java.time.ZonedDateTime;
import java.util.Set;

@Data
@Entity
@Table(name = "door_codes")
public class DoorCode {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Long id;

    @ManyToOne
    @JoinColumn(name = "issued_by_user_id")
    User issuedBy;

    String code;

    ZonedDateTime expireDate;

    @ManyToMany(mappedBy = "doorCodes")
    Set<Door> doors;
}
