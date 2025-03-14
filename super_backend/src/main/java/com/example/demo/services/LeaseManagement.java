package com.example.demo.services;

import com.dropbox.sign.ApiException;
import com.dropbox.sign.model.SignatureRequestGetResponse;
import com.example.demo.dto.LeaseSignRequestDTO;
import com.example.demo.entities.Lease;

public interface LeaseManagement {
    SignatureRequestGetResponse createLeaseSignatureRequest(LeaseSignRequestDTO leaseSignRequestDTO) throws ApiException;

    void cancelLeaseSignatureRequest(Long externalId) throws ApiException;

    Lease getLeaseStatus(Long externalId) throws ApiException;
}
