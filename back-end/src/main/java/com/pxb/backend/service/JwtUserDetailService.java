package com.pxb.backend.service;

import com.pxb.backend.model.AppUser;
import com.pxb.backend.model.UserRole;
import com.pxb.backend.repository.AppUserRepository;
import com.pxb.backend.repository.UserRoleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;



@Service
public class JwtUserDetailService implements UserDetailsService {
    @Autowired
    private AppUserRepository appUserRepository;

    @Autowired
    private UserRoleRepository userRoleRepository;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
//        $2a$10$x8lgF5VCti45oMoLuuMJs.NZIpkqd7/zegX0raTGQtAi9Fy/gSIAi
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
