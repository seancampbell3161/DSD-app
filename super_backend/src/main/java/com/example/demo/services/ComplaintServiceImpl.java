package com.example.demo.services;

import com.example.demo.dto.request.ComplaintRequest;
import com.example.demo.entities.Complaint;
import com.example.demo.entities.User;
import com.example.demo.repository.ComplaintRepository;
import com.example.demo.repository.UserRepository;
import com.example.demo.util.enums.ComplaintStatus;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.stereotype.Service;

import java.time.ZonedDateTime;
import java.util.List;

@Service
public class ComplaintServiceImpl {
    final ComplaintRepository complaintRepository;
    final UserRepository userRepository;

    @Autowired
    public ComplaintServiceImpl(ComplaintRepository complaintRepository, UserRepository userRepository) {
        this.complaintRepository = complaintRepository;
        this.userRepository = userRepository;
    }


    public Complaint createComplaint(ComplaintRequest complaintDTO, String username) {
        User user = userRepository.findByUsername(username).orElseThrow(() -> new EmptyResultDataAccessException("no user in db to create compalint with. please create a user account and log in to submit this", 1));
        Complaint newComplaint = Complaint.builder().complaintStatus(ComplaintStatus.NEW).timeCreated(ZonedDateTime.now()).message(complaintDTO.getMessage()).user(user).build();
        return complaintRepository.save(newComplaint);
    }

    public Complaint getComplaintById(Long id) {
        return complaintRepository.findById(id)
                .orElseThrow(() -> new EmptyResultDataAccessException("no complaint exists with id:," + id, 1));
    }

    public List<Complaint> getAllComplaints() {
        return complaintRepository.findAll();
    }

    public Complaint updateComplaint(Long id, ComplaintRequest complaintDTO) {
        Complaint complaint = complaintRepository.findById(id).orElseThrow(() -> new EmptyResultDataAccessException("no complaint with exists with id:," + id, 1));
        complaint.setMessage(complaintDTO.getMessage());
        return complaintRepository.save(complaint);
    }

    public void deleteComplaint(Long id) {
        Complaint complaint = complaintRepository.findById(id).orElseThrow(() -> new EmptyResultDataAccessException("no complaint with exists with id:," + id, 1));
        complaintRepository.delete(complaint);
    }

    public List<Complaint> getAllComplaintByUser(String username) {
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new EmptyResultDataAccessException("no user exists by that username in db. please insert records. share error with dev", 1));
        return complaintRepository.findAllByUser_Username(user);
    }

    public void deleteAllComplaintsByUser(String username) {
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new EmptyResultDataAccessException("no user exists by that username in db. please insert records. share error with dev", 1));

        complaintRepository.deleteAllByUser(user);
    }
}
