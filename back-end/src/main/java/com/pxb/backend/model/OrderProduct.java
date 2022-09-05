package com.pxb.backend.model;

import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Getter
@Setter
@RequiredArgsConstructor
public class OrderProduct {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column(name = "so_luong")
    private int quantity;

    @Column(name = "tong_tien")
    private Double totalPay;

    @Column(columnDefinition = "bit(1) default 0", name = "trang_thai")
    private Boolean isDeleted;

    @ManyToOne
    @JoinColumn(name = "ten_mat_hang")
    private Product product;

    @ManyToOne
    @JoinColumn(name = "ten_nguoi_thanh_toan")
    private AppUser appUser;

    @Column(name = "dia_chi")
    private String address;

}
