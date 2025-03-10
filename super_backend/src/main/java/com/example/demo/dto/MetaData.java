package com.example.demo.dto;

import lombok.Builder;
import lombok.Data;
//todo format, define, open api def
@Builder
@Data
public class MetaData {
    private String title;
    private String description;
    private String startDate;
    private String endDate;
}

