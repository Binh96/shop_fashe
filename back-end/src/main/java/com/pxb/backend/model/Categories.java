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
public class Categories {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column(name = "ten_danh_muc")
    private String nameCategory;

    @Column(name = "hinh_anh", columnDefinition = "longtext")
    private String img;

    @Column(name = "trang_thai", columnDefinition = "bit(1) default 0")
    private boolean isDeleted;

    @OneToMany(mappedBy = "categories")
    @JsonIgnore
    private List<Product> productList;

}
