//package com.example.demo.utils.configuration;
//
//import com.dropbox.sign.ApiClient;
//import org.springframework.context.annotation.Bean;
//import org.springframework.context.annotation.Configuration;
//import org.springframework.context.annotation.Scope;
//
//@Scope(value = "singleton")
//@Configuration
//public class DropBoxConfiguration {
//    //commented out for now.
//    //uses system env locally, must setup DROP_BOX_API_KEY in system env
//    private final String apiKey = System.getenv("DROPBOX_API_KEY");
//
//    @Bean(name = "dropBoxSignatureClient")
//    public ApiClient setupDropboxKey() {
//        return com.dropbox.sign.Configuration.getDefaultApiClient().setApiKey(apiKey);
//    }
//}
