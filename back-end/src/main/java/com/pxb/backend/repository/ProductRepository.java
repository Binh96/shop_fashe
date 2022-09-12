package com.pxb.backend.repository;

import com.pxb.backend.model.Product;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import javax.transaction.Transactional;
import java.util.List;

@Repository
@Transactional
public interface ProductRepository extends JpaRepository<Product, Integer> {
    @Query(value = "select * from product where xoa = 0", countQuery = "select count(*) from " +
            "(select * from product where xoa = 0) as product", nativeQuery = true)
    Page<Product> getAll(Pageable pageable);

    @Query(value = "select p.id, p.hang, p.mau_sac, p.mo_ta,p.thong_tin_ky_thuat, p.hinh_anh, p.xoa, p.xuat_xu, " +
            "p.ten_san_pham, p.gia, p.so_luong, p.trang_thai, p.loai_san_pham from product p join categories on categories.id = p.loai_san_pham" +
            " where p.xoa = 0 and categories.ten_danh_muc = :name", countQuery = "select count(*) from " +
            "(select p.id, p.hang, p.mau_sac, p.mo_ta, p.thong_tin_ky_thuat, p.hinh_anh, p.xoa, p.xuat_xu, " +
            "p.ten_san_pham, p.gia, p.so_luong, p.trang_thai, p.loai_san_pham from product p " +
            "join categories on categories.id = p.loai_san_pham " +
            "where p.xoa = 0 and categories.ten_danh_muc = :name) as product", nativeQuery = true)
    Page<Product> getAllProductByCategory(@Param("name")String name, Pageable pageable);

    @Query(value = "select * from Product where xoa = 0 and id = :id", nativeQuery = true)
    Product getProductById(@Param("id") int id);

    @Query(value ="select * from Product where xoa = 0 and ten_san_pham like :name and loai_san_pham = :id", nativeQuery = true)
    List<Product> getProductByName(@Param("name") String name, @Param("id") int id);

    @Query(value ="select p.id, p.hang, p.mau_sac, p.mo_ta,p.thong_tin_ky_thuat, p.hinh_anh, p.xoa, p.xuat_xu, " +
            "p.ten_san_pham, p.gia, p.so_luong, p.trang_thai, p.loai_san_pham from product p " +
            "join categories on p.loai_san_pham = categories.id " +
            "where gia between :first and :second and hang like :brand and p.loai_san_pham = :id", nativeQuery = true)
    List<Product> getProductByFilterPrice(@Param("first") String first,
                                   @Param("second") String second,
                                   @Param("brand") String brand,
                                   @Param("id") int id);
}
