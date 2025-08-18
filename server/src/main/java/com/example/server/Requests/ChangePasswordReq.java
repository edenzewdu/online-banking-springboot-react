package com.example.server.Requests;

import lombok.*;

@NoArgsConstructor
@AllArgsConstructor
@ToString
@Getter
@Setter
@Builder
public class ChangePasswordReq {
    private String oldPassword;
    private String newPassWord;
}
