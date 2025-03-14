package com.example.demo.services;

import com.dropbox.sign.ApiClient;
import com.dropbox.sign.ApiException;
import com.dropbox.sign.api.SignatureRequestApi;
import com.dropbox.sign.model.*;
import com.example.demo.dto.LeaseSignRequestDTO;
import com.example.demo.entities.Apartment;
import com.example.demo.entities.Lease;
import com.example.demo.entities.Tenant;
import com.example.demo.entities.User;
import com.example.demo.repository.ApartmentRepository;
import com.example.demo.repository.LeaseRepository;
import com.example.demo.repository.TenantRepository;
import com.example.demo.repository.UserRepository;
import com.example.demo.util.enums.DocStatus;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.ZonedDateTime;
import java.util.List;
import java.util.Optional;

@Slf4j
@Service
public class LeaseManagementDropBoxImpl implements LeaseManagement {
    private final SignatureRequestApi signatureRequestApi;
    private final UserRepository userRespository;
    private final LeaseRepository leaseRepository;
    private final ApartmentRepository apartmentRepository;
    private final TenantRepository tenantRepository;

    @Autowired
    public LeaseManagementDropBoxImpl(UserRepository userRepository, LeaseRepository leaseRepository, ApartmentRepository apartmentRepository, TenantRepository tenantRepository) {
        ApiClient apiClient = com.dropbox.sign.Configuration.getDefaultApiClient().setApiKey(System.getProperty("DROPBOX_API_KEY"));
        this.signatureRequestApi = new SignatureRequestApi(apiClient);
        this.userRespository = userRepository;
        this.leaseRepository = leaseRepository;
        this.apartmentRepository = apartmentRepository;
        this.tenantRepository = tenantRepository;
    }


    @Transactional(rollbackFor = Exception.class)
    public SignatureRequestGetResponse createLeaseSignatureRequest(LeaseSignRequestDTO leaseSignRequestDTO) throws ApiException {
        SignatureRequestGetResponse response;
        Optional<User> userRecord = userRespository.findByEmailIgnoreCase(leaseSignRequestDTO.getSignerEmails().getFirst());
        User user = userRecord.orElseThrow(() -> new EmptyResultDataAccessException("user not found", 1));
        var signer = new SubSignatureRequestSigner().emailAddress(leaseSignRequestDTO.getSignerEmails().getFirst()).name(user.getName()).order(0);
        var signOptions = new SubSigningOptions().draw(true).type(true).defaultType(SubSigningOptions.DefaultTypeEnum.DRAW);
        var subFieldOptions = new SubFieldOptions().dateFormat(SubFieldOptions.DateFormatEnum.DDMMYYYY);
        var data = new SignatureRequestSendRequest()
                .title(leaseSignRequestDTO.getMetaData().getTitle())
                .subject("Lease Agreement with Super")
                .message("please review and sign the lease")
                .signers(List.of(signer))
                .ccEmailAddresses(leaseSignRequestDTO.getCcEmails())
                .addFilesItem(leaseSignRequestDTO.getFile())
                .signingOptions(signOptions)
                .fieldOptions(subFieldOptions)
                .testMode(true);
        response = signatureRequestApi.signatureRequestSend(data);
        Optional<Apartment> apartmentOptional = apartmentRepository.findByApartmentNumber(leaseSignRequestDTO.getApartmentNumber());
        Apartment apartment = apartmentOptional.orElseThrow(() -> new EmptyResultDataAccessException("no record matches apartment number in database", 1));
        Optional<Tenant> tenantOptional = Optional.of(tenantRepository.findByUser(user).orElse(tenantRepository.save(Tenant.builder().user(user).build())));
        Lease newLease = leaseRepository.save(Lease.builder().status(DocStatus.PENDING).apartment((apartment)).externalId(response.getSignatureRequest().getSignatureRequestId())
                .startDate(ZonedDateTime.parse(leaseSignRequestDTO.getMetaData().getStartDate()))
                .endDate(ZonedDateTime.parse(leaseSignRequestDTO.getMetaData().getEndDate()))
                .tenants(List.of(tenantOptional.get()))
                .build());
        log.info("new lease created: {}", newLease);
        return response;
    }

    public void cancelLeaseSignatureRequest(Long leaseId) throws ApiException, EmptyResultDataAccessException {
        Lease lease = leaseRepository.findById(leaseId).orElseThrow();
        signatureRequestApi.signatureRequestCancel(lease.getExternalId());
        lease.setStatus(DocStatus.CANCELED);
        leaseRepository.save(lease);
    }


    public Lease getLeaseStatus(Long leaseId) throws ApiException, EmptyResultDataAccessException {
        Lease lease = leaseRepository.findById(leaseId).orElseThrow();
        log.info("lease status got: {}", lease);
        return lease;
    }

    public void dropboxCallback(Long leaseId) throws ApiException, EmptyResultDataAccessException {
        Optional<Lease> lease = leaseRepository.findById(leaseId);
        SignatureRequestGetResponse response = signatureRequestApi.signatureRequestGet(lease.orElseThrow().getExternalId());
        //todo check resonse object
        log.info("lease status updated for leaseId: {}", leaseId);
    }
}
