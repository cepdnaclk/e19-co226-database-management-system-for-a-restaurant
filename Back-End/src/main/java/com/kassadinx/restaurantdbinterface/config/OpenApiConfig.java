package com.kassadinx.restaurantdbinterface.config;

import io.swagger.v3.oas.annotations.OpenAPIDefinition;
import io.swagger.v3.oas.annotations.info.Contact;
import io.swagger.v3.oas.annotations.info.Info;
import io.swagger.v3.oas.annotations.servers.Server;

@OpenAPIDefinition(
        info = @Info(
                contact = @Contact(
                        name = "CO226 Restaurant Management System",
                        email = "e19008@eng.pdn.ac.lk"

                ),
                description = "API Documentation for Restaurant Management System",
                title = "Restaurant Management System API",
                version = "1.0",

                termsOfService = "Terms of service"
        ),
        servers = {
                @Server(
                        description = "Local ENV",
                        url = "http://localhost:8080"
                ),

        }



)


public class OpenApiConfig {
}