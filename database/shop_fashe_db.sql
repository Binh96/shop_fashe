drop database if exists `shop_fashe`;
create database shop_fashe;

use shop_fashe;

create table app_role(
	id int auto_increment primary key,
    role_name varchar(255),
    is_deleted bit(1) default 0
);

create table app_user(
	id int auto_increment primary key,
    create_date date,
    user_name varchar(255),
    `password` varchar(255),
    is_deleted bit(1) default 0
);

create table user_role(
	id int auto_increment primary key,
    role_id int,
    user_id int,
    is_deleted bit(1) default 0,
    foreign key (user_id) references app_user(id),
    foreign key (role_id) references app_role(id)
);

create table person(
	id int auto_increment primary key,
    ten varchar(255) not null,
    ngay_sinh date,
    dia_chi varchar(255) not null,
    hinh_anh text,
    is_deleted bit(1) default 0,
	user_id int,
    foreign key (user_id) references app_user(id)
);

create table catagories(
	id int auto_increment primary key,
    ten_danh_muc varchar(255) not null,
    is_deleted bit(1) default 0
);

create table product(
	id int auto_increment primary key,
    ten_san_pham varchar(255) not null,
    so_luong int not null,
    gia double not null,
    mau_sac varchar(255) not null,
    trang_thai varchar(255) not null,
    xuat_xu varchar(255) not null,
    loai_san_pham int not null,
    hang varchar(255) not null,
    thong_tin_ky_thuat longtext,
    hinh_anh text,
    is_deleted bit(1) default 0,
    foreign key (loai_san_pham) references catagories(id)
);

create table `order`(
	id int auto_increment primary key,
    so_luong int not null,
    tong_tien double not null,
    ten_hang int not null,
    user_id int not null,
    dia_chi varchar(255) not null,
    is_deleted bit(1) default 0,
    foreign key (user_id) references app_user(id),
    foreign key (ten_hang) references product(id)
);

create table payment_method(
	id int auto_increment primary key,
    ten_phuong_thuc varchar(255)
);

create table payment(
	id int auto_increment primary key,
    user_id int not null,
    amount int not null,
    ngay_thanh_toan date not null,
    phuong_thuc_thanh_toan int,
    foreign key (user_id) references app_user(id),
    foreign key (phuong_thuc_thanh_toan) references payment_method(id)
);
