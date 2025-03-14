package com.example.demo.repository;

import com.example.demo.entities.ParkingCode;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ParkingCodeRepository extends JpaRepository<ParkingCode, Long> {

    @Query("SELECT e FROM EntryCode e WHERE e.door.id = :doorId AND e.issuedBy.id = :userId")
    List<ParkingCode> findByUserAndDoor(@Param("userId") Long userId , @Param("doorId") Long doorId);

    List<ParkingCode> findParkingCodesByDoor_Id(Long doorId);
}
