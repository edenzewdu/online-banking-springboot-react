package com.example.server.Requests;

import com.example.server.Model.User;
import lombok.*;
import org.springframework.security.config.annotation.web.headers.HeadersSecurityMarker;

@NoArgsConstructor
@AllArgsConstructor
@HeadersSecurityMarker
@Builder
@Setter
@Getter
@ToString
public class LoginResponse {

    private String jwtToken;
    private User user;

}
