package com.example.demo.config;

import io.swagger.v3.oas.models.Components;
import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Info;
import io.swagger.v3.oas.models.security.SecurityRequirement;
import io.swagger.v3.oas.models.security.SecurityScheme;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class SwaggerConfig {

    @Bean
    public OpenAPI customOpenAPI(){
        return new OpenAPI()
                .info(new Info().title("The tenant backend API").description("Here you can find all the endpoints and the requirements"))
                .addSecurityItem(new SecurityRequirement().addList("TheTenantBackendAPIsecurityScheme"))
                .components(new Components().addSecuritySchemes("TheTenantBackendAPIsecurityScheme", new SecurityScheme()
                        .name("TheTenantBackendAPIsecurityScheme")
                        .type(SecurityScheme.Type.HTTP).scheme("bearer").bearerFormat("JWT")));
    }
}
