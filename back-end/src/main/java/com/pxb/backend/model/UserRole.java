package com.pxb.backend.model;

import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Getter
@Setter
@RequiredArgsConstructor
public class UserRole {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private int id;

    @ManyToOne
    @JoinColumn(name = "ten_nguoi_dung", referencedColumnName = "id")
    private AppUser appUser;

    @ManyToOne
    @JoinColumn(name = "quyen_nguoi_dung", referencedColumnName = "id")
    private AppRole appRole;

    @Column(name = "trang_thai", columnDefinition = "bit(1) default 0")
    private boolean isDeleted;
}
