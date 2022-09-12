package com.pxb.backend.dto;

import com.pxb.backend.model.Categories;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import javax.validation.constraints.NotNull;

@Getter
@Setter
@AllArgsConstructor
public class ProductDto {

    @NotNull
    private String nameProduct;
    @NotNull
    private int quantity;
    @NotNull
    private Double price;
    @NotNull
    private String color;
    @NotNull
    private String status;
    @NotNull
    private String madeIn;
    @NotNull
    private Categories categories;
    @NotNull
    private String brand;
    @NotNull
    private String detail;
    @NotNull
    private String desc;
    @NotNull
    private String img;

}
