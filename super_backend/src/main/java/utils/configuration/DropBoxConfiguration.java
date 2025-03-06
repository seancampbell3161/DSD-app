package utils.configuration;

import com.dropbox.sign.ApiClient;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class DropBoxConfiguration {

    @Bean
    public ApiClient dropboxApiClientConfiguration() {
        return com.dropbox.sign.Configuration.getDefaultApiClient().setApiKey("DROP_BOX_API_KEY");
    }
}
