package com.pxb.backend.repository;

import com.pxb.backend.dto.CategoryDto;
import com.pxb.backend.model.Categories;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CategoriesRepository extends JpaRepository<Categories, Integer> {
    @Query(value = "select ct.id, ct.ten_danh_muc as tenDanhMuc, ct.hinh_anh as hinhAnh from categories ct", nativeQuery = true)
    List<CategoryDto> getCategoryHasPicture();
}
