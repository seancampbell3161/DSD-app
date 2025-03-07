package com.example.demo.services;

import com.dropbox.sign.ApiClient;
import com.dropbox.sign.ApiException;
import com.dropbox.sign.api.SignatureRequestApi;
import com.dropbox.sign.model.*;
import com.example.demo.dto.LeaseSignRequestDTO;
import com.example.demo.entities.User;
import com.example.demo.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.io.File;
import java.util.List;
import java.util.MissingResourceException;
import java.util.Optional;

@Service
public class LeaseManagementDropBoxImpl implements LeaseManagement {
    private final SignatureRequestApi signatureRequestApi;
    private final UserRepository userRespository;
    @Autowired
    public LeaseManagementDropBoxImpl(ApiClient apiClient, UserRepository userRepository) {
        this.signatureRequestApi = new SignatureRequestApi(apiClient);
        userRespository = userRepository;
    }

    @Override
    public SignatureRequestGetResponse createLeaseSignatureRequest(LeaseSignRequestDTO leaseSignRequestDTO) {
        SignatureRequestGetResponse response;
        Optional<User> user = userRespository.findByEmailIgnoreCase(leaseSignRequestDTO.getSignerEmails().getFirst());
        if(user.isEmpty()){
            throw new RuntimeException("no user in db matching email address");
        }
        var signer = new SubSignatureRequestSigner().emailAddress(leaseSignRequestDTO.getSignerEmails().getFirst()).name(user.get().getName()).order(0);
        var signOptions = new SubSigningOptions().draw(true).type(true).defaultType(SubSigningOptions.DefaultTypeEnum.DRAW);
        var subFieldOptions = new SubFieldOptions().dateFormat(SubFieldOptions.DateFormatEnum.DDMMYYYY);
        var data = new SignatureRequestSendRequest()
                .title("Lease Agreement")
                .subject("Lease Agreement with Super")
                .message("please review and sign the lease")
                .signers(List.of(signer))
                .ccEmailAddresses(leaseSignRequestDTO.getCcEmails())
                .addFilesItem((File) leaseSignRequestDTO.getFile())
                .signingOptions(signOptions)
                .fieldOptions(subFieldOptions)
                .testMode(true);
        try {
            response = signatureRequestApi.signatureRequestSend(data);
            System.out.println(response);
        } catch (ApiException e) {
            throw new RuntimeException(e);
        }
        return response;
    }

    //todo
    @Override
    public void cancelLeaseSignatureRequest() {

    }

    @Override
    public void getLeaseStatus() {
        try {
            SignatureRequestGetResponse requestStatus = signatureRequestApi.signatureRequestGet("requestID pulled from db");
        } catch (ApiException e) {
            throw new RuntimeException(e);
        }
    }
}
