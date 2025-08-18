package com.example.server.Controllers;

import com.example.server.Model.Role;
import com.example.server.Model.User;
import com.example.server.Service.SignUpService;
import lombok.AllArgsConstructor;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.sql.Date;
import java.util.UUID;

@RestController
@RequestMapping("/api/v1")
@AllArgsConstructor
public class SignUpController {

    @Autowired
    private SignUpService signUpService;

    /*
     * Accepting Only 4 properties
     * 
     * Signup FirstName,Last Name,email,password
     */

   @PostMapping("/signup")
    public ResponseEntity<User> signup(@RequestBody User user) {

        if (signUpService.findByEmail(user.getEmail()) != null) {
            return new ResponseEntity<>(HttpStatus.CONFLICT);
        }

        user.setUserId(UUID.randomUUID().toString());
        user.setRole(Role.USER);
        user.setCreatedDate(new Date(System.currentTimeMillis()));

        User savedUser = signUpService.createUser(user);
        return new ResponseEntity<>(savedUser, HttpStatus.OK);
    }

    // @PostMapping("/otp")
    // public ResponseEntity<?> checkOTP(@RequestBody User theUser) {
    //     if (signUpService.findByOTP(theUser.getOtp()) == null) {
    //         return new ResponseEntity<>(HttpStatus.CONFLICT);
    //     }
    //     signUpService.updateIsEmailVerified(theUser.getOtp());
    //     return new ResponseEntity<>(HttpStatus.OK);
    // }

    // @PostMapping("/resend-otp/{userId}")
    // public ResponseEntity<?> resendOTP(@PathVariable String userId) {

    //     User user = signUpService.findById(userId);
    //     String otp = RandomString.make(6);
    //     user.setOtp(otp);
    //     signUpService.save(user);
    //     mailService.transactionMail(user.getEmail(), "Registration OTP code",
    //             "This is 6 digit otp code: " + otp + "\n\n Click here to verify: http://localhost:3000/signup/otp"
    //                     + "\n\nThank you.");
    //     return new ResponseEntity<>(HttpStatus.OK);
    // }

}
