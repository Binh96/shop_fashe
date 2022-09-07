package com.pxb.backend.controller;

import com.pxb.backend.model.AppUser;
import com.pxb.backend.model.UserRole;
import com.pxb.backend.service.IAppRoleService;
import com.pxb.backend.service.IAppUserService;
import com.pxb.backend.service.IUserRoleService;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.util.List;

@RestController
@RequestMapping("/api")
public class AppUserController {
    @Autowired
    private IAppUserService iAppUserService;
    @Autowired
    private IAppRoleService iAppRoleService;
    @Autowired
    private IUserRoleService iUserRoleService;

    @GetMapping("")
    public ResponseEntity<Page<AppUser>> getUser(@PageableDefault(value = 5)Pageable pageable){
        Page<AppUser> appUsers = iAppUserService.getAppUser(pageable);
        if(appUsers.isEmpty()){
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
        return new ResponseEntity<>(appUsers, HttpStatus.OK);
    }
//    @GetMapping("")
//    public ResponseEntity<List<UserRole>> getUser(){
//        List<UserRole> userRoles = iAppUserService.;
//        if(appUsers.isEmpty()){
//            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
//        }
//        return new ResponseEntity<>(appUsers, HttpStatus.OK);
//    }

    @PostMapping(value="/save", consumes = { MediaType.APPLICATION_FORM_URLENCODED_VALUE })
    public ResponseEntity<AppUser> saveUser(AppUser appUser){
        URI uri = URI.create(org.springframework.web.servlet.support.ServletUriComponentsBuilder.fromCurrentContextPath()
                .path("/api/save").toUriString());
        iAppUserService.saveAppUser(appUser);
        return ResponseEntity.created(uri).body(iAppUserService.saveAppUser(appUser));
    }
}
