package com.pxb.backend.service;

import com.pxb.backend.model.AppUser;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;


public interface IAppUserService {
    AppUser findByName(String username);

    void saveAppUser(AppUser appUser);

    Page<AppUser> getAppUser(Pageable pageable);
}
