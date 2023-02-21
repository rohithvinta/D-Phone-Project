package com.bajaj.controller;

import com.bajaj.beans.UserBean;
import com.bajaj.entity.UserEntity;
import com.bajaj.beans.AuthRequest;
import com.bajaj.exceptions.EmailNotFoundException;
import com.bajaj.exceptions.PasswordNotFoundException;
import com.bajaj.service.JwtService;
import com.bajaj.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@CrossOrigin(origins = "*")
@RestController
public class UserController {
    //ADD COLUMNS INTO USERS DAtABASE FOR COLUMNS POINTS AND REFERRAL CODE
    @Autowired
    private UserService userService;
    @Autowired
    private JwtService jwtService;
    @Autowired
    private AuthenticationManager authenticationManager;

    @PostMapping("/login")
    public ResponseEntity<String> authenticateAndGetToken(@RequestBody AuthRequest authRequest) {
        try {
            System.out.println("in login route");
            Authentication authentication = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(authRequest.getUsername(), authRequest.getPassword()));
            System.out.println("---------");
            System.out.println(authRequest.getPassword());
            if (authentication.isAuthenticated()) {
                return new ResponseEntity<>(jwtService.generateToken(authRequest.getUsername()), HttpStatus.OK);
            } else {
                throw new UsernameNotFoundException("invalid user request !");
            }
        } catch (Exception e) {
            return new ResponseEntity<>(e.getLocalizedMessage(), HttpStatus.NOT_FOUND);
        }

    }
    
    @GetMapping("/userinfo")
    public Optional<UserEntity> getUserData(@RequestHeader("Authorization") String token) {
        String name = jwtService.extractUsername(token.split(" ")[1].toString());
        System.out.println(userService.findByname(name));
        return userService.findByname(name);
    }


    @PostMapping("/new")
    public ResponseEntity<?> addNewUser(@RequestBody UserBean userBean) throws PasswordNotFoundException, EmailNotFoundException {
        return userService.addUser(userBean);
    }
    @GetMapping("/allusers")
    public List<UserBean> allRecords(){
        List<UserBean> msg=userService.allRecords();
        return msg;
    }
    @GetMapping("/user/welcome")
    public String welcome() {
        return "Welcome this endpoint is not secure";
    }

    @GetMapping("/user/test")
    public String test() {
        return "test";
    }
}
