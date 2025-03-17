package com.example.demo.repository;

import com.example.demo.entities.Lease;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface LeaseRepository extends JpaRepository<Lease, Long> {
     default Lease findByIdOrThrow(Long leaseId) {
        return findById(leaseId)
                .orElseThrow(() -> new EmptyResultDataAccessException("No record matching the lease ID provided in the database", 1));
    }
}
