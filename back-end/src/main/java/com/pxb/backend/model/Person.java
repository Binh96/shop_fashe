package com.pxb.backend.model;

import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Getter
@Setter
@RequiredArgsConstructor
public class Person {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column(name = "ten")
    private String name;

    @Column(name = "ngay_sinh", columnDefinition = "date")
    private String birthday;

    @Column(name = "dia_chi", columnDefinition = "text not null")
    private String address;

    @Column(name = "hinh_anh", columnDefinition = "text not null")
    private String image;

    @Column(name = "trang_thai", columnDefinition = "bit(1) default 0")
    private boolean isDeleted;

    @OneToOne
    @JoinColumn(name = "tai_khoan")
    private AppUser appUser;
}
