package com.bajaj.repository;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.bajaj.entity.ProductEntity;

public interface ProductRepository extends JpaRepository<ProductEntity, Integer> {
    List findById(int productId);

    @Query("Select p from ProductEntity p where p.productId=:id")
    ProductEntity findByProductId(int id);
}
