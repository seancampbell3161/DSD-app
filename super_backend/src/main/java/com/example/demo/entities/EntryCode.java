package com.example.demo.entities;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;

import java.time.ZonedDateTime;

@Entity
@Inheritance(strategy = InheritanceType.SINGLE_TABLE)
@DiscriminatorColumn(name = "entry_code_type")
@Data
@SuperBuilder
@NoArgsConstructor
@AllArgsConstructor
public abstract class EntryCode {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Long id;

    @ManyToOne
    @JoinColumn(name = "issued_by_user_id")
    User issuedBy;

    String code;

    ZonedDateTime expireDate;

    @ManyToOne
    @JoinColumn(name = "door_id")
    Door door;

}
