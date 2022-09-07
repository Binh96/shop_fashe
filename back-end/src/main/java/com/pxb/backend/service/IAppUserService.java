package com.pxb.backend.service;

import com.pxb.backend.model.AppUser;
import com.pxb.backend.model.UserRole;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.repository.query.Param;

import java.util.List;


public interface IAppUserService {
    AppUser findByName(String username);

    AppUser saveAppUser(AppUser appUser);

    Page<AppUser> getAppUser(Pageable pageable);

}
