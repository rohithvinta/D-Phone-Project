package com.bajaj.service;

import com.bajaj.beans.UserBean;
import com.bajaj.entity.UserEntity;
import com.bajaj.exceptions.EmailNotFoundException;
import com.bajaj.exceptions.PasswordNotFoundException;
import com.bajaj.repository.UserInfoRepository;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.security.SecureRandom;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.Random;

@Service
public class UserService {
    @Autowired
    private UserInfoRepository userInfoRepository;
    @Autowired
    private PasswordEncoder passwordEncoder;

    public static String code(int codeLength) {
        char[] chars = "abcdefghijklmnopqrstuvwxyz1234567890".toCharArray();
        StringBuilder sb = new StringBuilder();
        Random random = new SecureRandom();
        for (int i = 0; i < codeLength; i++) {
            char c = chars[random.nextInt(chars.length)];
            sb.append(c);
        }
        String output = sb.toString();
        System.out.println(output);
        return output;
    }
    public ResponseEntity<?> addUser(UserBean userBean) throws EmailNotFoundException, PasswordNotFoundException {
    UserEntity userEntity = new UserEntity();
    try {
        if(userBean.getPassword()==null){
            throw new PasswordNotFoundException("Cannot register without a password");
        }
        if (userBean.getEmail() == null)
            throw new EmailNotFoundException("Please provide an Email");
        else
        {
            System.out.println(userBean);
        userBean.setPoints(0);
        userBean.setRoles("USER");
        userBean.setReferralCode(code(8));
        userBean.setPassword(passwordEncoder.encode(userBean.getPassword()));
        BeanUtils.copyProperties(userBean , userEntity);
        userInfoRepository.save(userEntity);
        System.out.println("You have been added as a user");
        return new ResponseEntity<UserBean>(userBean, HttpStatus.OK);
        }
    } catch (EmailNotFoundException e){
        return new ResponseEntity<String>(e.getLocalizedMessage(), HttpStatus.BAD_REQUEST);
    }
    catch (PasswordNotFoundException e){
        return new ResponseEntity<String>(e.getLocalizedMessage(), HttpStatus.BAD_REQUEST);
    }
    catch(Exception e){
        return new ResponseEntity<UserBean>(userBean,HttpStatus.CONFLICT);
    }
    }
    public List<UserBean> allRecords() {

        //return userDao.findAll()
        List <UserEntity> allUsers=userInfoRepository.findAll();
        List<UserBean> allUserBean=new ArrayList<UserBean>();
        for( UserEntity u: allUsers)
        {
            UserBean bean=new UserBean();
            BeanUtils.copyProperties(u,bean);
            allUserBean.add(bean);
        }
        return allUserBean;
    }

    public Optional<UserEntity> findByname(String name) {
        System.out.println("name = " + name);
        Optional<UserEntity> user = userInfoRepository.findByName(name);
        System.out.println("asdasd" + user.toString());
        return user;
    }
}
