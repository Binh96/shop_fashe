package com.pxb.backend.service.impl;

import com.pxb.backend.model.Product;
import com.pxb.backend.repository.ProductRepository;
import com.pxb.backend.service.IProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProductServiceImpl implements IProductService {
    @Autowired
    private ProductRepository productRepository;
    @Override
    public Page<Product> getAll(Pageable pageable) {
        return productRepository.getAll(pageable);
    }

    @Override
    public void createProduct(Product product) {
        productRepository.save(product);
    }

    @Override
    public Page<Product> getAllProductByCategory(String name, Pageable pageable) {
        return productRepository.getAllProductByCategory(name, pageable);
    }

    @Override
    public List<Product> searchProductByName(String name, int category) {
        return productRepository.getProductByName('%'+name+'%', category);
    }

    @Override
    public List<Product> searchProductByFilterPrice(String first, String second, String brand, int category) {
        return productRepository.getProductByFilterPrice(first, second, '%'+brand+'%', category);
    }

    @Override
    public Product getProductById(int id) {
        return productRepository.getProductById(id);
    }
}
