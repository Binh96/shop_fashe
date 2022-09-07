package com.pxb.backend.repository;

import com.pxb.backend.model.AppUser;
import com.pxb.backend.model.UserRole;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AppUserRepository extends JpaRepository<AppUser, Integer> {
//    @Query(value = "select usr.id, usr.trang_thai, usr.quyen_nguoi_dung, usr.ten_nguoi_dung\n" +
//            "from user_role usr\n" +
//            "inner join app_user on app_user.id = usr.id\n" +
//            "where app_user.trang_thai = 0 and app_user.ten_nguoi_dung = :username", nativeQuery = true)
//    UserRole findUserRolByName(@Param("username") String username);

    @Query(value = "select * from app_user where trang_thai = 0 and ten_nguoi_dung = :username", nativeQuery = true)
    AppUser findByName(@Param("username") String username);

    @Query(value = "select * from app_user where trang_thai = 0",
        countQuery = "select count(*) from (select * from app_user where trang_thai = 0) as app_user", nativeQuery = true)
    Page<AppUser> getAppUser(Pageable pageable);
}
