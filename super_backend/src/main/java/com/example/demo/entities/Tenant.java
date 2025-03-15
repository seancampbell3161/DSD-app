package com.example.demo.entities;

import jakarta.persistence.*;
import lombok.Builder;
import lombok.Data;

import java.util.List;
@Builder
@Data
@Table(name = "tenants")
@Entity
public class Tenant {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Long id;

    @OneToOne
    @JoinColumn(name = "user_profile_id", unique = true, nullable = false)
    final User user;

    @ManyToMany(mappedBy = "tenants")
    List<Lease> leases;
}
