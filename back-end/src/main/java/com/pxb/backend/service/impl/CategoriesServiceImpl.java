package com.pxb.backend.service.impl;

import com.pxb.backend.dto.CategoryDto;
import com.pxb.backend.model.Categories;
import com.pxb.backend.repository.CategoriesRepository;
import com.pxb.backend.service.ICategoriesService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CategoriesServiceImpl implements ICategoriesService {
    @Autowired
    private CategoriesRepository categoriesRepository;

    @Override
    public List<CategoryDto> getAllCategoryHasPicture() {
        return categoriesRepository.getCategoryHasPicture();
    }
    @Override
    public List<Categories> getAll() {
        return categoriesRepository.findAll();
    }

}
