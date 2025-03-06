package com.example.demo.services;

import com.dropbox.sign.model.SignatureRequestGetResponse;
import com.example.demo.dto.LeaseSignRequestDTO;

public interface LeaseManagement {
    SignatureRequestGetResponse createLeaseSignatureRequest(LeaseSignRequestDTO leaseSignRequestDTO);

    void cancelLeaseSignatureRequest();

    void getLeaseStatus();
}
