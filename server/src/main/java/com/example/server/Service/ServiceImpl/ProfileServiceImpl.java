package com.example.server.Service.ServiceImpl;


import com.example.server.Execptions.UserNotFoundException;
import com.example.server.Model.User;
import com.example.server.Model.UserDetail;
import com.example.server.Repository.UserRepository;
import com.example.server.Service.ProfileService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ProfileServiceImpl implements ProfileService {

    @Autowired
    private UserRepository userRepo;

    @Override
    public User createUserProfile(UserDetail userDetails, String userId) throws UserNotFoundException {

        if (userDetails.getFyda() == null || userDetails.getMobile() == null) {

            throw new UserNotFoundException("Provide mandatory fields");
        }

        User theUser = userRepo.findById(userId).get();
        userDetails.setUser(theUser);
        theUser.setUserdetails(userDetails);
        User savingUpdatedUser = userRepo.save(theUser);
        return savingUpdatedUser;

    }

    @Override
    public User updateUserProfile(UserDetail userDetails, String userId) throws UserNotFoundException {

        if (userDetails.getFyda() == null || userDetails.getMobile() == null) {

            throw new UserNotFoundException("Provide mandatory fields");
        }

        User theUser = userRepo.findById(userId).get();
        userDetails.setUser(theUser);
        theUser.setUserdetails(userDetails);
        User savingUpdatedUser = userRepo.save(theUser);
        return savingUpdatedUser;

    }
}
