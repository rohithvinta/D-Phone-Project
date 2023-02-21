package com.bajaj.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.bajaj.beans.ProductBean;
import com.bajaj.entity.ProductEntity;
import com.bajaj.repository.ProductRepository;

@Service
public class ProductService {
    @Autowired
    public ProductRepository productDao;

    public List<ProductBean> allProducts() {
        List<ProductEntity> products = productDao.findAll();
        List<ProductBean> productBean = new ArrayList<>();
        for (ProductEntity p : products) {
            ProductBean bean = new ProductBean();
            BeanUtils.copyProperties(p, bean);
            productBean.add(bean);
        }
        return productBean;
    }

    public List<ProductBean> productById(int productId) {
        List<ProductEntity> products = productDao.findById(productId);
        List<ProductBean> productEntity = productEntity = new ArrayList<>();
        for (ProductEntity p : products) {
            ProductBean bean = new ProductBean();
            BeanUtils.copyProperties(p, bean);
            productEntity.add(bean);
        }
        return productEntity;
    }
}
