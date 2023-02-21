package com.bajaj.beans;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ProductBean {
    private int productId;
    private String productModel;
    private String productBrand;
    private int productPrice;
    private String productDescription;
    private String productImage;
}
