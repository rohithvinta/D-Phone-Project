package com.bajaj.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Entity
@Table(name="OrderEntity")
public class OrderEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    @Column(name = "userId")
    private int userId;
    @Column(name = "productId")
    private int productId;
    @Column(name="orderDate")
    @Temporal(TemporalType.DATE)
    private Date orderDate;
    @Column(name = "redeemedPoints")
    private int redeemedPoints;
    @Column(name = "salePrice")
    private int salePrice;
    @Column(name = "orderStatus")
    private String orderStatus;
}
