package com.example.demo.utils.configuration;

import com.dropbox.sign.ApiClient;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class DropBoxConfiguration {
    //uses system env locally, must setup DROP_BOX_API_KEY in system env
    @Bean
    public com.dropbox.sign.ApiClient dropboxApiClientConfiguration() {
        String apiKey = System.getenv("DROP_BOX_API_KEY");
        return com.dropbox.sign.Configuration.getDefaultApiClient().setApiKey(apiKey);
    }
}
