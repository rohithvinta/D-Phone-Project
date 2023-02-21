package com.bajaj.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Table(name = "mobile_phone")
public class ProductEntity {
    @Id
    @Column(name = "id")
    private int productId;
    @Column(name = "model")
    private String productModel;
    @Column(name = "brand")
    private String productBrand;
    @Column(name = "price")
    private int productPrice;
    @Column(name = "description")
    private String productDescription;
    @Column(name = "image_link")
    private String productImage;
}
