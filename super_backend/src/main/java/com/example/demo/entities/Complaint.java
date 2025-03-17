package com.example.demo.entities;

import com.example.demo.util.enums.ComplaintStatus;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.ZonedDateTime;

@Builder
@Data
@Table(name = "complaints")
@Entity
@NoArgsConstructor
@AllArgsConstructor
public class Complaint {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Long id;

    @JoinColumn(name = "submitter_user_id)", nullable = false)
    @ManyToOne
    User user;

    @Column(name = "message")
    String message;

    @Column(name = "time_created")
    ZonedDateTime timeCreated;

    @Column(name = "complaint_status")
    ComplaintStatus complaintStatus;
}
