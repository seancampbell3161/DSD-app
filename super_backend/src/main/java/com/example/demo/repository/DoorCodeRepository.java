package com.example.demo.repository;

import com.example.demo.entities.DoorCode;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface DoorCodeRepository extends JpaRepository<DoorCode, Long> {

    @Query("SELECT e FROM EntryCode e WHERE e.door.id = :doorId AND e.issuedBy.id = :userId")
    Optional<DoorCode> findByUserAndDoor(@Param("userId") Long userId , @Param("doorId") Long doorId);

    @Modifying
    @Query("DELETE EntryCode e WHERE e.door.id = :doorId AND e.issuedBy.id = :userId")
    void deleteByUserAndDoor(@Param("userId") Long userId , @Param("doorId") Long doorId);
}
