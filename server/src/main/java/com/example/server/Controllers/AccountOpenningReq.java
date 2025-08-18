package com.example.server.Controllers;


import com.example.server.Model.User;
import com.example.server.Service.SignUpService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin
@RestController
@RequestMapping("/api/v1/user")
public class AccountOpenningReq {

    @Autowired
    private SignUpService signUpService;

    @PutMapping("/acopreq/{userId}")
    public ResponseEntity<?> accountOpenningReq(@PathVariable String userId) {

        ResponseEntity<?> re = null;

        System.out.println("+++ " + userId);
        User theUser = signUpService.getAUser(userId).get();

        if (theUser.getUserdetails().getFyda() == null) {
            return new ResponseEntity<String>("Update Mandatory Details Please!", HttpStatus.BAD_REQUEST);
        }
        System.out.println("+++ empty1");
        theUser.setAccountopenningreq(true);
        signUpService.save(theUser);

        if (theUser.isAccountopenningreq() == false) {
            return new ResponseEntity<String>("Account oppening request failed", HttpStatus.BAD_REQUEST);
        } else {
            return new ResponseEntity<User>(theUser, HttpStatus.OK);
        }
    }


    @GetMapping("/acopreqchng/{userId}")
    public ResponseEntity<?> accountOpeningReqChange(@PathVariable String userId) {

        ResponseEntity<?> re = null;

        User theUser = signUpService.getAUser(userId).get();

        theUser.setAccountopenningreq(!theUser.isAccountopenningreq());
        signUpService.save(theUser);

        if (theUser.isAccountopenningreq() == false) {
            return new ResponseEntity<String>("Account oppening request deleted", HttpStatus.OK);
        } else {
            return new ResponseEntity<String>("Account oppening request successfull", HttpStatus.OK);
        }
    }

}
