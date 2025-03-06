package com.example.demo.entities;

import jakarta.persistence.*;
import lombok.Data;

import java.time.ZonedDateTime;
import java.util.List;

@Data
@Table(name = "leases")
@Entity
public class Lease {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    Long id;
    @Column(nullable = false, name = "lease_start_date")
    final ZonedDateTime startDate;
    @Column(nullable = false, name = "lease_end_date")
    final ZonedDateTime endDate;
    @ManyToOne
    @JoinColumn(name = "apartment_id", nullable = false)
    final Apartment apartment;
    @ManyToMany
    @JoinTable(name = "lease_tenants", joinColumns = @JoinColumn(name = "lease_id"), inverseJoinColumns = @JoinColumn(name = "tenant_id"))
    final List<Tenant> tenants;
}
