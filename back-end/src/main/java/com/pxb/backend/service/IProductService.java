package com.pxb.backend.service;

import com.pxb.backend.model.Product;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface IProductService {
    Page<Product> getAll(Pageable pageable);

    void createProduct(Product product);

    Page<Product> getAllProductByCategory(String id, Pageable pageable);

    List<Product> searchProductByName(String name, int category);

    List<Product> searchProductByFilterPrice(String first, String second, String brand, int category);

    Product getProductById(int id);
}
