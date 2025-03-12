package com.example.demo.utils.enums;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonValue;

public enum DocStatus {
    DRAFT("draft"),
    ARCHIVED("archived"),
    SIGNED("signed"),
    SENT("sent"),
    CANCELLED("canceled");
    private final String documentStatus;

    DocStatus(String documentStatus) {
        this.documentStatus = documentStatus;
    }

    @JsonValue
    public String getDocumentStatus(){
        return  documentStatus;
    }
    //this makes values of enum in json passed insensitive
    @JsonCreator
    public static DocStatus fromValue(String documentStatus){
        for(DocStatus docStatus: values()){
            if(docStatus.documentStatus.equalsIgnoreCase(documentStatus)){
                return docStatus;
            }
        }
        throw new IllegalArgumentException("Invalid document status type");
    }
}

