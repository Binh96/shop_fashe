package com.pxb.backend.service.impl;

import com.pxb.backend.model.AppUser;
import com.pxb.backend.model.UserRole;
import com.pxb.backend.repository.AppUserRepository;
import com.pxb.backend.repository.UserRoleRepository;
import com.pxb.backend.service.IAppUserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

@Service
public class AppUserServiceImpl implements IAppUserService, UserDetailsService {
    @Autowired
    private AppUserRepository appUserRepository;

    @Autowired
    private UserRoleRepository userRoleRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

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

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        AppUser appUser = appUserRepository.findByName(username);
        List<UserRole> userRoles = userRoleRepository.findUserRolByName(appUser);
        List<GrantedAuthority> grantList = new ArrayList<>();
        if (userRoles != null) {
            for (UserRole userRole : userRoles) {
                GrantedAuthority authority = new SimpleGrantedAuthority(userRole.getAppRole().getRoleName());
                grantList.add(authority);
            }
        }
        return new org.springframework.security.core.userdetails.User(appUser.getUsername(), appUser.getPassword(), grantList);
    }
}
