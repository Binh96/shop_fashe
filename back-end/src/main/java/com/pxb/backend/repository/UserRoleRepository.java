package com.pxb.backend.repository;

import com.pxb.backend.model.AppUser;
import com.pxb.backend.model.UserRole;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface UserRoleRepository extends JpaRepository<UserRole, Integer> {
    @Query(value = "select usr.id, usr.ten_nguoi_dung, usr.quyen_nguoi_dung, usr.trang_thai\n" +
            "from user_role usr\n" +
            "where trang_thai = 0 and ten_nguoi_dung = :#{#appUser.id}", nativeQuery = true)
    List<UserRole> findUserRolByName(AppUser appUser);
}
