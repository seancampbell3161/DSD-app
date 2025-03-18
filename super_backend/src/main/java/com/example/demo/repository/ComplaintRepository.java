package com.example.demo.repository;

import com.example.demo.entities.Complaint;
import com.example.demo.entities.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface ComplaintRepository extends JpaRepository<Complaint, Long> {
    List<Complaint> findAllByUser_Username(User user);

    Optional<Complaint> findById(Long id);

    void deleteAllByUser(User username);
}
