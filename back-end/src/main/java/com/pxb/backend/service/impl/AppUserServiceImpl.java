package com.pxb.backend.service.impl;

import com.pxb.backend.model.AppUser;
import com.pxb.backend.repository.AppUserRepository;
import com.pxb.backend.service.IAppUserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Collection;

@Service
public class AppUserServiceImpl implements IAppUserService, UserDetailsService {
    @Autowired
    private AppUserRepository appUserRepository;

    @Override
    public AppUser findByName(String username) {
        return appUserRepository.findByName(username);
    }

    @Override
    public void saveAppUser(AppUser appUser) {
        appUserRepository.save(appUser);
    }

    @Override
    public Page<AppUser> getAppUser(Pageable pageable) {
        return appUserRepository.getAppUser(pageable);
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        AppUser appUser = appUserRepository.findByName(username);
        if(appUser == null){
            throw new UsernameNotFoundException("User name not found in the database");
        }
        else{

        }
        Collection<SimpleGrantedAuthority> authorities = new ArrayList<>();
        appUser.getUserRoleList().forEach(role -> {authorities.add(new SimpleGrantedAuthority(role.getAppRole().getRoleName()));
        });
        return new org.springframework.security.core.userdetails.User(appUser.getNameUser(), appUser.getPassword(),
                authorities);
    }
}
