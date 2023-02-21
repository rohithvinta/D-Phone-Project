package com.bajaj.service;

import com.bajaj.beans.ReferralBean;
import com.bajaj.entity.ReferralEntity;
import com.bajaj.entity.UserEntity;
import com.bajaj.repository.ReferralRepository;
import com.bajaj.repository.UserInfoRepository;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class ReferralService {
    @Autowired
    private ReferralRepository referralRepository;
    @Autowired
    private UserInfoRepository userInfoRepository;
   
    public ResponseEntity<String> addReferral(Optional<UserEntity> userEntityOptional, ReferralBean referralBean) {
        ReferralEntity referralEntity = new ReferralEntity();
        BeanUtils.copyProperties(referralBean, referralEntity);
        referralEntity.setReferrerId(userEntityOptional.get().getId());
        referralEntity.setReferrerCode(userEntityOptional.get().getReferralCode());
        // String
        // checkEmail=userInfoRepository.findByEmail(referralEntity.getReferralEmail());
        // String
        // checkEmail1=referralRepository.findByEmail(referralEntity.getReferralEmail());
        // if(!(checkEmail==null)) {
        // return new ResponseEntity<String>("Invalid referral", HttpStatus.CONFLIC);
        // }
        // else if(!(checkEmail1==null)) {
        // return new ResponseEntity<String>("referral Exists",HttpStatus.OK);
        // }
        // else {

        referralRepository.save(referralEntity);
        return new ResponseEntity<String>("referral added Successfully", HttpStatus.OK);
        // }

    }
    public ResponseEntity <ReferralBean> editReferral(ReferralBean referralBean)
    {
        ReferralEntity referralEntity = referralRepository.findById(referralBean.getReferrerId());
        referralEntity.setReferralName(referralBean.getReferralName());
        referralEntity.setReferralEmail(referralBean.getReferralEmail());
        referralEntity.setReferralPhoneNumber(referralBean.getReferralPhoneNumber());
        ReferralBean bean=new ReferralBean();
        BeanUtils.copyProperties(referralEntity,bean);
        return new ResponseEntity<ReferralBean>(bean, HttpStatus.OK);

    }
    public ResponseEntity <List<ReferralBean>> allReferral(Optional<UserEntity> user)
    {
        System.out.println("-------");
        System.out.println(user.toString());
        int referralId=user.get().getId();
        List<ReferralEntity> referralEntity = referralRepository.allReferralById(referralId) ; // here we have to add the id of the user who has logged in
        List<ReferralBean> referralBean=new ArrayList<>();
        for(ReferralEntity r:referralEntity)
        {
            ReferralBean bean=new ReferralBean();
            BeanUtils.copyProperties(r,bean);
            referralBean.add(bean);
        }

        return new ResponseEntity <List<ReferralBean>>(referralBean,HttpStatus.OK);
    }
}
