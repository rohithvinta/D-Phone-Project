package com.bajaj.service;

import com.bajaj.beans.OrderBean;
import com.bajaj.beans.ProductBean;
import com.bajaj.entity.OrderEntity;
import com.bajaj.entity.ProductEntity;
import com.bajaj.entity.UserEntity;
import com.bajaj.repository.OrderRepository;
import com.bajaj.repository.ProductRepository;

import java.util.*;

import com.bajaj.repository.UserInfoRepository;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

@Service
public class OrderService {
    @Autowired
    public OrderRepository orderRepository;

    @Autowired
    public ProductRepository productRepository;
    @Autowired
    public UserInfoRepository userRepository;

    public ResponseEntity<String> newOrder(OrderBean orderBean, Optional<UserEntity> userEntityOptional,String referalCode)
    {
        // try {
        // OrderEntity ordersEntity = new OrderEntity();
        // BeanUtils.copyProperties(orderBean, ordersEntity);
        // int id=userEntityOptional.get().getId();
        // ordersEntity.setUserId(id);
        // if( referalCode!=null)
        // {
        //     Integer referralId= userRepository.findByReferralCode(referalCode);
        //     System.out.print("hello  :"+ referralId);
        //     //int referralId = 0;
        //     if(referralId ==null)
        //     {
        //         return new  ResponseEntity<String>("Invalid Referral Code", HttpStatus.OK);
        //     }
        //     else
        //     {
        //         Optional<UserEntity> user_details = userRepository.findById(referralId);
        //         user_details.get().setPoints(user_details.get().getPoints()+500);
        //         userRepository.save(user_details.get());
        //         ordersEntity.setRedeemedPoints(userEntityOptional.get().getPoints());
        //         ordersEntity.setSalePrice(ordersEntity.getSalePrice()-userEntityOptional.get().getPoints());
        //         userEntityOptional.get().setPoints(0);
        //         ordersEntity.setUserId(userEntityOptional.get().getId());
        //     }

        // }
        // orderRepository.save(ordersEntity);
        // return new  ResponseEntity<String>("order executed Successfully", HttpStatus.OK);
        // }
        // catch (Exception e)
        // {
        // System.out.println(e);
        // return new ResponseEntity<String>("order failed",HttpStatus.CONFLICT);

        //}

        OrderEntity orderEntity = new OrderEntity();
        BeanUtils.copyProperties(orderBean, orderEntity);
        Integer id = userEntityOptional.get().getId();
        orderEntity.setUserId(id);
        try
        {
        UserEntity referredUser = userRepository.findByReferralCode(referalCode);
        Integer ReferredId = referredUser.getId();
        boolean flag=true;
        if (ReferredId >= 0)
        {
            flag = true;

        }
        else
        {
            flag = false;
        }
        if (flag == true)
        {
            referredUser.setPoints(referredUser.getPoints() + 500);
            userRepository.save(referredUser);
        }
    }
    finally
    {
        /////////////////////////////////
       // orderEntity.setSalePrice(orderBean.getSalePrice() - userEntityOptional.get().getPoints());
        userEntityOptional.get().setPoints(0);

        ////////////////
        orderRepository.save(orderEntity);
        return new ResponseEntity<String>("order executed Successfully", HttpStatus.OK);
    }
    }


    public ResponseEntity<List<ProductBean>> allOrders(Optional<UserEntity> userEntityOptional) {
        Map<OrderBean, ProductBean> orderProduct = new HashMap<>();
        int id = userEntityOptional.get().getId();
        List<OrderEntity> orders = orderRepository.findByUserId(id); ///here we have to add the id of the user who is logged in
        List<ProductBean> productList = new ArrayList<>();
        for (OrderEntity o : orders) {
            ProductEntity product = productRepository.findByProductId(o.getProductId());
            //OrderBean ordersBean=new OrderBean();
            ProductBean productBean = new ProductBean();
            //BeanUtils.copyProperties(o,ordersBean);
            BeanUtils.copyProperties(product, productBean);
            productList.add(productBean);
            //orderProduct.put(ordersBean,productBean);
        }
        return new ResponseEntity<List<ProductBean>>(productList, HttpStatus.OK);
    }
}

