package com.example.server.Requests;

import lombok.*;

@NoArgsConstructor
@AllArgsConstructor
@ToString
@Getter
@Setter
@Builder
public class LoginRequest {
    private String email;
    private String password;
}
