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
public class Product {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column(name = "ten_san_pham")
    private String nameProduct;

    @Column(name = "so_luong")
    private int quantity;

    @Column(name = "gia")
    private Double price;

    @Column(name="mau_sac")
    private String color;

    @Column(name = "trang_thai")
    private String status;

    @Column(name = "xuat_xu")
    private String madeIn;

    @ManyToOne
    @JoinColumn(referencedColumnName = "id", name = "loai_san_pham")
    private Categories categories;

    @Column(name = "hang")
    private String brand;

    @Column(name = "thong_tin_ky_thuat", columnDefinition = "longtext")
    private String detail;

    @Column(name ="hinh_anh")
    private String img;

    @OneToMany(mappedBy = "product")
    @JsonIgnore
    private List<OrderProduct> orders;

    @Column(name = "xoa", columnDefinition = "bit(1) default 0")
    private boolean isDeleted;

}
