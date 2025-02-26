package com.example.demo.util.enums;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonValue;

public enum DoorStatus {
    LOCKED("locked"),
    UNLOCKED("unlocked"),
    OUT_OF_SERVICE("out of service");
    private final String status;

    DoorStatus(String status) {
        this.status = status;
    }

    @JsonValue
    public String getStatus(){
        return  status;
    }
    //this makes values of enum in json passed insensitive
    @JsonCreator
    public static DoorStatus fromValue(String status){
        for(DoorStatus doorStatus: values()){
            if(doorStatus.status.equalsIgnoreCase(status)){
                return doorStatus;
            }
        }
        throw new IllegalArgumentException("Invalid status type");
    }
}
