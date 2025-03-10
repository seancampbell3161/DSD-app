package com.example.demo.services;

import com.dropbox.sign.model.SignatureRequestGetResponse;
import com.example.demo.dto.LeaseSignRequestDTO;
import org.springframework.web.servlet.resource.NoResourceFoundException;

public interface LeaseManagement {
    SignatureRequestGetResponse createLeaseSignatureRequest(LeaseSignRequestDTO leaseSignRequestDTO) throws Exception;

    void cancelLeaseSignatureRequest();

    void getLeaseStatus();
}
