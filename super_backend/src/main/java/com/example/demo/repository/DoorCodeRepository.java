package com.example.demo.repository;

import com.example.demo.entities.DoorCode;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface DoorCodeRepository extends JpaRepository<DoorCode, Long> {
}
