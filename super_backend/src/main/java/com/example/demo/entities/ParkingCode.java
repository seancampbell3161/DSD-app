package com.example.demo.entities;

import jakarta.persistence.Entity;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;

@EqualsAndHashCode(callSuper = true)
@Data
@SuperBuilder
@Entity
@AllArgsConstructor
@NoArgsConstructor
public class ParkingCode extends EntryCode{
    String numberPlate;
    String guestName;
}
