package com.example.server.Service.ServiceImpl;

import com.example.server.Execptions.UserNotFoundException;
import com.example.server.Model.User;
import com.example.server.Repository.UserRepository;
import com.example.server.Requests.LoginRequest;
import com.example.server.Service.LoginService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class LoginServiceImpl implements LoginService {
    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Override
    public User findByEmail(LoginRequest loginReq) throws UserNotFoundException {

        User user = userRepository.findByEmail(loginReq.getEmail());

        if (user == null)
            throw new UserNotFoundException("Email does not exist");

        if (user.isEnabled() == false)
            throw new UserNotFoundException("Email Not Verified");

        boolean iscorrect = passwordEncoder.matches(loginReq.getPassword(), user.getPassword());

        if (iscorrect == false)
            throw new UserNotFoundException("Invalid credentials");
        else
            return user;

    }

}
