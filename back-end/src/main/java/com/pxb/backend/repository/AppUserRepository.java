package com.pxb.backend.repository;

import com.pxb.backend.model.AppUser;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface AppUserRepository extends JpaRepository<AppUser, Integer> {
    @Query(value = "select * from app_user where trang_thai = 0 and ten_nguoi_dung := username", nativeQuery = true)
    AppUser findByName(@Param("username") String username);

    @Query(value = "select * from app_user where trang_thai = 0",
        countQuery = "select count(*) from (select * from app_user where trang_thai = 0) as app_user", nativeQuery = true)
    Page<AppUser> getAppUser(Pageable pageable);
}
