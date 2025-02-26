package com.example.demo.entities;

import com.example.demo.util.enums.DocStatus;
import jakarta.persistence.*;
import lombok.Data;

import java.time.ZonedDateTime;
//todo shouldn't a lease be created with a user who signed it? since you a user maps to the leases they signed, co-signed. Once lease expires. Need to update the apartment tenants accordingly. Can't depend on Apartment table to map.
@Data
@Entity(name = "lease")
public class Lease {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Long id;
    @Column
    ZonedDateTime startDate;
    @Column
    ZonedDateTime endDate;
    @Enumerated(EnumType.STRING)
    @Column
    DocStatus docStatus;
    @Column
    //todo define
    Apartment apartment;
    //todo add userId signed? 
}
