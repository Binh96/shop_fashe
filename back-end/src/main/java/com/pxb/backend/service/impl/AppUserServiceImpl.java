package com.pxb.backend.service.impl;

import com.pxb.backend.model.AppUser;
import com.pxb.backend.repository.AppUserRepository;
import com.pxb.backend.service.IAppUserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AppUserServiceImpl implements IAppUserService {
    @Autowired
    private AppUserRepository appUserRepository;

    @Autowired
    private BCryptPasswordEncoder passwordEncoder;

    @Override
    public AppUser findByName(String username) {
        return appUserRepository.findByName(username);
    }

    @Override
    public AppUser saveAppUser(AppUser appUser) {
        appUser.setPassword(passwordEncoder.encode(appUser.getPassword()));
        return appUserRepository.save(appUser);
    }

    @Override
    public Page<AppUser> getAppUser(Pageable pageable) {
        return appUserRepository.getAppUser(pageable);
    }

}
