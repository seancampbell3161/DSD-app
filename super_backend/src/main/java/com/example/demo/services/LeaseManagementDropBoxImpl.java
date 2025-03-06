package com.example.demo.services;

import com.dropbox.sign.ApiClient;
import com.dropbox.sign.ApiException;
import com.dropbox.sign.api.SignatureRequestApi;
import com.dropbox.sign.model.*;
import org.springframework.stereotype.Service;

import java.io.File;
import java.util.List;
import java.util.Map;

@Service
public class LeaseManagementDropBoxImpl implements LeaseManagement {
    private final SignatureRequestApi signatureRequestApi;

    public LeaseManagementDropBoxImpl(ApiClient apiClient) {
        this.signatureRequestApi = new SignatureRequestApi(apiClient);
    }


    @Override
    public SignatureRequestGetResponse createLeaseSignatureRequest() {
        SignatureRequestGetResponse response;
        var signatureRequestSendRequest = new SignatureRequestSendRequest();
        var signer = new SubSignatureRequestSigner().emailAddress("address").name("name").order(0);
        var signOptions = new SubSigningOptions().draw(true).type(true).defaultType(SubSigningOptions.DefaultTypeEnum.DRAW);
        var subFieldOptions = new SubFieldOptions().dateFormat(SubFieldOptions.DateFormatEnum.DDMMYYYY);
        var data = new SignatureRequestSendRequest()
            .title("NDA with Acme Co.")
            .subject("The NDA we talked about")
            .message("Please sign this NDA and then we can discuss more. Let me know if you have any questions.")
            .signers(List.of(signer))
            .ccEmailAddresses(List.of("lawyer1@dropboxsign.com", "lawyer2@dropboxsign.com"))
            .addFilesItem(new File("example_signature_request.pdf"))
            .metadata(Map.of("custom_id", 1234, "custom_text", "NDA #9"))
            .signingOptions(signOptions)
            .fieldOptions(subFieldOptions)
            .testMode(true);
        try {
            response = signatureRequestApi.signatureRequestSend(signatureRequestSendRequest);
        } catch (ApiException e) {
            throw new RuntimeException(e);
        }
        return response;
    }

    @Override
    public void cancelLeaseSignatureRequest() {

    }

    @Override
    public void getLeaseStatus() {

    }
}
