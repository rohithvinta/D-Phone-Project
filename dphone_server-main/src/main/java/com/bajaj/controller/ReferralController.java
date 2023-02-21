package com.bajaj.controller;

import com.bajaj.beans.ReferralBean;
import com.bajaj.entity.UserEntity;
import com.bajaj.service.JwtService;
import com.bajaj.service.ReferralService;
import com.bajaj.service.UserService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@CrossOrigin(origins = "*")
@RestController
public class ReferralController {
    @Autowired
    private ReferralService referralService;

    @Autowired
    private UserService userService;
    @Autowired
    private JwtService jwtService;

    @PostMapping("/referrals/add")
    public ResponseEntity<String> addReferral(@RequestBody ReferralBean referralBean,
            @RequestHeader("Authorization") String token) {
        String name = jwtService.extractUsername(token.split(" ")[1].toString());
        Optional<UserEntity> userEntityOptional = userService.findByname(name);
        return referralService.addReferral(userEntityOptional, referralBean);
    }
    
    @PostMapping("/referrals/edit")
    public ResponseEntity<ReferralBean> editReferral(@RequestBody ReferralBean referralBean)
    {
        return referralService.editReferral(referralBean);
    }
    @GetMapping("/referrals/allreferral")
    public ResponseEntity<List<ReferralBean>> allReferral(@RequestHeader("Authorization") String token) {
        String name = jwtService.extractUsername(token.split(" ")[1].toString());
        Optional<UserEntity> user = userService.findByname(name);
        return referralService.allReferral(user);
    }
}
