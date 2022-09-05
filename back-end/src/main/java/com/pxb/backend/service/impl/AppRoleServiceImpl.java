package com.pxb.backend.service.impl;

import com.pxb.backend.model.AppRole;
import com.pxb.backend.repository.AppRoleRepository;
import com.pxb.backend.service.IAppRoleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AppRoleServiceImpl implements IAppRoleService {
    @Autowired
    private AppRoleRepository appRoleRepository;

    @Override
    public List<AppRole> getAppRole() {
        return appRoleRepository.getAppRole();
    }
}
