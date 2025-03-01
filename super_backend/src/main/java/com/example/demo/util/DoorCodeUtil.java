package com.example.demo.util;

import java.util.Random;

public class DoorCodeUtil {
    public static String getRandomNumberString() {
        // It will generate 6 digit random Number.
        // from 0 to 999999
        Random rnd = new Random();
        int number = rnd.nextInt(99999999);

        // this will convert any number sequence into 6 character.
        return String.format("%08d", number);
    }
}
