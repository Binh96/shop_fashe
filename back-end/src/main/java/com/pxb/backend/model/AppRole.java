package com.pxb.backend.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.util.List;

@Entity
@Getter
@Setter
@RequiredArgsConstructor
public class AppRole {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private int id;

    @Column(name = "ten_quyen")
    private String roleName;

    @OneToMany(mappedBy = "appRole")
    @JsonIgnore
    private List<UserRole> userRoleList;

    @Column(name = "trang_thai", columnDefinition = "bit(1) default 0")
    private boolean isDeleted;
}
