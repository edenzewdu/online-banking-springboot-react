package com.example.server.Service;

import com.example.server.Execptions.UserNotFoundException;
import com.example.server.Model.User;
import com.example.server.Model.UserDetail;

public interface ProfileService {
    public User createUserProfile(UserDetail userDetails, String userId) throws UserNotFoundException;

    public User updateUserProfile(UserDetail userDetails, String userId) throws UserNotFoundException;

}
