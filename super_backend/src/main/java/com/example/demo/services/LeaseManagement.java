package com.example.demo.services;

import com.dropbox.sign.model.SignatureRequestGetResponse;

public interface LeaseManagement {
    SignatureRequestGetResponse createLeaseSignatureRequest();

    void cancelLeaseSignatureRequest();

    void getLeaseStatus();
}
