package com.example.demo.entities;

import com.example.demo.util.enums.DocStatus;
import jakarta.persistence.*;
import lombok.Builder;
import lombok.Data;


import java.time.ZonedDateTime;
import java.util.List;
@Builder
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
    @Column(nullable = false, name = "external_id")
    String externalId;
    @Enumerated(EnumType.STRING)
    @Column(name = "status", columnDefinition = "DEFAULT 'draft'")
    DocStatus status;
    @ManyToOne
    @JoinColumn(name = "apartment_id", nullable = false)
    final Apartment apartment;
    @ManyToMany
    @JoinTable(name = "lease_tenants", joinColumns = @JoinColumn(name = "lease_id"), inverseJoinColumns = @JoinColumn(name = "tenant_id"))
    final List<Tenant> tenants;
}
