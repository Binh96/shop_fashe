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
public class Payment {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column(name = "tien_thanh_toan")
    private Double amount;

    @Column(name = "ngay_thanh_toan")
    private String datePayment;

    @ManyToOne
    @JoinColumn(referencedColumnName = "id", name = "phuong_thuc_thanh_toan")
    private PaymentMethod  paymentMethod;

    @ManyToOne
    @JoinColumn(name = "ten_nguoi_thanh_toan")
    private AppUser appUser;

    @Column(name = "trang_thai", columnDefinition = "bit(1) default 0")
    private boolean isDeleted;
}
