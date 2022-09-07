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
public class AppUser {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private int id;

    @Column(name = "ngay_tao")
    private String dateCreate;

    @Column(name = "ten_nguoi_dung", columnDefinition = "varchar(255) unique")
    private String username;

    @Column(name = "mat_khau")
    private String password;

    @OneToMany(mappedBy = "appUser", fetch = FetchType.EAGER)
    @JsonIgnore
    private List<UserRole> userRoleList;

    @OneToMany(mappedBy = "appUser")
    @JsonIgnore
    private List<Payment> paymentList;

    @OneToMany(mappedBy = "appUser")
    @JsonIgnore
    private List<OrderProduct> orders;

    @OneToOne(mappedBy = "appUser")
    @JsonIgnore
    private Person person;

    @Column(name = "trang_thai", columnDefinition = "bit(1) default 0")
    private boolean isDeleted;
}
