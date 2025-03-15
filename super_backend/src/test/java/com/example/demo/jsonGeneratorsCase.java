package com.example.demo;

import com.example.demo.dto.LeaseSignRequestDTO;
import com.example.demo.dto.MetaData;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.SerializationFeature;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.util.List;

import static org.mockito.Mockito.mock;


@ExtendWith(MockitoExtension.class)
public class jsonGeneratorsCase {
    ObjectMapper objectMapper = new ObjectMapper().configure(SerializationFeature.FAIL_ON_EMPTY_BEANS, false);

    @Test
    void generateDTO() throws IOException {
        File file = new File("../super_backend/target/json_generated/mockfile.pdf");
        MetaData metaData = MetaData.builder().title("test file").description("test description").build();
        LeaseSignRequestDTO leaseSignRequestDTO = LeaseSignRequestDTO.builder().signerEmails(List.of("rubengarcia0515@gmail.com")).ccEmails(List.of("rubengarcia0515@gmail.com"))
                .apartmentNumber(10L).metaData(metaData).file(file).build();
        objectMapper.writerWithDefaultPrettyPrinter().writeValue(new File("../super_backend/target/json_generated/esignature.json"), leaseSignRequestDTO);
    }

     @Test
    void generateRequestDTO() throws IOException {
        File file = new File("../super_backend/target/json_generated/mockfile.pdf");
        MetaData metaData = MetaData.builder().title("test file").description("test description").build();
        LeaseSignRequestDTO leaseSignRequestDTO = LeaseSignRequestDTO.builder().signerEmails(List.of("rubengarcia0515@gmail.com")).ccEmails(List.of("rubengarcia0515@gmail.com"))
                .apartmentNumber(10L).metaData(metaData).file(file).build();
        objectMapper.writerWithDefaultPrettyPrinter().writeValue(new File("../super_backend/target/json_generated/leaseSignDetails.json"), leaseSignRequestDTO);
    }
}
