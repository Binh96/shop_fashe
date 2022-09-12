package com.pxb.backend.service;

import com.pxb.backend.dto.CategoryDto;
import com.pxb.backend.model.Categories;

import java.util.List;

public interface ICategoriesService {
    List<Categories> getAll();
    List<CategoryDto> getAllCategoryHasPicture();
}
