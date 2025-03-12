package com.example.demo.services;

import com.dropbox.sign.ApiException;
import com.dropbox.sign.model.SignatureRequestGetResponse;
import com.example.demo.dto.LeaseSignRequestDTO;

public interface LeaseManagement {
    SignatureRequestGetResponse createLeaseSignatureRequest(LeaseSignRequestDTO leaseSignRequestDTO) throws ApiException;

    void cancelLeaseSignatureRequest(String externalId) throws ApiException;

    SignatureRequestGetResponse getLeaseStatus(String externalId) throws ApiException;
}
