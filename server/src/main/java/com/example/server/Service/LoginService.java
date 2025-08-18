package com.example.server.Service;

import com.example.server.Execptions.UserNotFoundException;
import com.example.server.Model.User;
import com.example.server.Requests.LoginRequest;

public interface LoginService {

    public User findByEmail(LoginRequest loginReq) throws UserNotFoundException;

}
