package com.example.server.Service;

import com.example.server.Model.User;
import com.example.server.Requests.ChangePasswordReq;

import java.util.List;
import java.util.Optional;

public interface SignUpService {

    public User createUser(User user);

    public Optional<User> getAUser(String userId);

    public List<User> GetAllUsers();

//    public boolean checkEmail(String email);

    public User findByResetPasswordToken(String token);

    public void updateResetPasswordToken(String token, String email);

    public void updatePassword(String password, String token);

    public Boolean changePassword(String userId, ChangePasswordReq changePasswordReq);

//    public User findByOTP(String otp);

    public User findById(String userId);

    // public void updateIsEmailVerified(String otp);

    // // void updateOtp(String otp, String email);

    void deleteAccount(String email);

    public User findByEmail(String email);

    public void save(User theUser);

    // public List<User> getAllReq();

}