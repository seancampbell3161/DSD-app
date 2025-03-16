package com.example.demo.util.enums;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonValue;

public enum ComplaintStatus {
    NEW("new"),
    PENDING("pending"),
    RESOLVED("resolved");
    private final String complaintStatus;

    ComplaintStatus(String complaintStatus) {
        this.complaintStatus = complaintStatus;
    }

    @JsonValue
    public String getDocumentStatus() {
        return complaintStatus;
    }

    //this makes values of enum in json passed insensitive
    @JsonCreator
    public static ComplaintStatus fromValue(String complaintStatus) {
        for (ComplaintStatus status : values()) {
            if (status.complaintStatus.equalsIgnoreCase(complaintStatus)) {
                return status;
            }
        }
        throw new IllegalArgumentException("Invalid complaint status entered");
    }
}
