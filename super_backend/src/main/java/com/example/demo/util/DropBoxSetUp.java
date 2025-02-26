package com.example.demo.util;

import com.dropbox.sign.ApiException;
import com.dropbox.sign.Configuration;
import com.dropbox.sign.api.AccountApi;
import com.dropbox.sign.model.AccountCreateRequest;
import com.dropbox.sign.model.AccountCreateResponse;

public class DropBoxSetUp {
    AccountCreateResponse startUp(){
          var apiClient = Configuration.getDefaultApiClient()
            .setApiKey("DROP_BOX_API_KEY");

        // or, configure Bearer (JWT) authorization: oauth2
        /*
        var apiClient = Configuration.getDefaultApiClient()
            .setBearerToken("YOUR_ACCESS_TOKEN");
        */

        var accountApi = new AccountApi(apiClient);

        var data = new AccountCreateRequest().emailAddress("newuser@dropboxsign.com");


        try {
            AccountCreateResponse result = accountApi.accountCreate(data);
            System.out.println(result);
            return result;
        } catch (ApiException e) {
            System.err.println("Exception when calling AccountApi#accountCreate");
            System.err.println("Status code: " + e.getCode());
            System.err.println("Reason: " + e.getResponseBody());
            System.err.println("Response headers: " + e.getResponseHeaders());
            e.printStackTrace();
            return null;
        }
    }
}
