package com.example.demo.entities;

import jakarta.persistence.*;
import lombok.Data;

import java.time.ZonedDateTime;
import java.util.List;

@Data
@Builder
@Entity
@Table(name = "door_codes")
@NoArgsConstructor
@AllArgsConstructor
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
    List<Door> doors;
}
