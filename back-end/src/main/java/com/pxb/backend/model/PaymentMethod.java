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
public class PaymentMethod {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column(name = "ten_phuong_thuc")
    private String nameMethod;

    @OneToMany(mappedBy = "paymentMethod")
    @JsonIgnore
    private List<Payment> paymentList;

    @Column(name = "trang_thai", columnDefinition = "bit(1) default 0")
    private boolean isDeleted;
}
