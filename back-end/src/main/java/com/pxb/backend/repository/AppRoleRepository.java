package com.pxb.backend.repository;

import com.pxb.backend.model.AppRole;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AppRoleRepository extends JpaRepository<AppRole, Integer> {
    @Query(value = "select * from app_role where trang_thai = 0", nativeQuery = true)
    List<AppRole> getAppRole();
}
