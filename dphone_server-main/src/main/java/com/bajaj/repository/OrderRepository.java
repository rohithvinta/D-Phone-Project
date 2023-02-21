package com.bajaj.repository;

import com.bajaj.entity.OrderEntity;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface OrderRepository extends JpaRepository<OrderEntity,Integer> {
    @Query("Select u from OrderEntity u where u.userId = :Id")
    public List <OrderEntity> findByUserId(int Id);
}
