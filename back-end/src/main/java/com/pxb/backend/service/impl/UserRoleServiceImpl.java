package com.pxb.backend.service.impl;

import com.pxb.backend.model.AppUser;
import com.pxb.backend.model.UserRole;
import com.pxb.backend.repository.UserRoleRepository;
import com.pxb.backend.service.IUserRoleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserRoleServiceImpl implements IUserRoleService {
    @Autowired
    private UserRoleRepository userRoleRepository;
    @Override
    public List<UserRole> getUserRole(AppUser appUser) {
        return userRoleRepository.findUserRolByName(appUser);
    }
}
