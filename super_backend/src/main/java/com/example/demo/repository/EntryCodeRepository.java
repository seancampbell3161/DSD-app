package com.example.demo.repository;

import com.example.demo.entities.EntryCode;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.ZonedDateTime;

@Repository
public interface EntryCodeRepository extends JpaRepository<EntryCode, Long> {

    @Modifying
    @Transactional
    @Query("DELETE FROM DoorCode d WHERE d.expireDate < :now")
    void deleteExpiredDoorCodes(@Param("now") ZonedDateTime now);
}
