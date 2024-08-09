-- Tables
DROP TABLE order_detail CASCADE CONSTRAINTS;
DROP TABLE order_info CASCADE CONSTRAINTS;
DROP TABLE basket_item CASCADE CONSTRAINTS;
DROP TABLE basket CASCADE CONSTRAINTS;
DROP TABLE product CASCADE CONSTRAINTS;
DROP TABLE product_category CASCADE CONSTRAINTS;
DROP TABLE user_definition CASCADE CONSTRAINTS;
DROP TABLE favorite CASCADE CONSTRAINTS;
DROP TABLE history CASCADE CONSTRAINTS;

-- Sequences
DROP SEQUENCE user_definition_seq;
DROP SEQUENCE product_category_seq;
DROP SEQUENCE product_seq;
DROP SEQUENCE order_seq;
DROP SEQUENCE order_detail_seq;
DROP SEQUENCE basket_item_seq;
DROP SEQUENCE basket_seq;
DROP SEQUENCE favorite_seq;
DROP SEQUENCE history_seq;

-- Packages
DROP PACKAGE global_exceptions;
DROP PACKAGE hash_pkg;
DROP PACKAGE user_val_pkg;
DROP PACKAGE user_br_pkg;
DROP PACKAGE user_pkg;
DROP PACKAGE category_pkg;
DROP PACKAGE category_br_pkg;
DROP PACKAGE product_br_pkg;
DROP PACKAGE product_pkg;
DROP PACKAGE basket_item_br_pkg;
DROP PACKAGE basket_item_pkg;
DROP PACKAGE basket_br_pkg;
DROP PACKAGE basket_pkg;
DROP PACKAGE order_info_val_pkg;
DROP PACKAGE order_info_br_pkg;
DROP PACKAGE order_info_pkg;
DROP PACKAGE order_detail_br_pkg;
DROP PACKAGE order_detail_pkg;
DROP PACKAGE purchase_pkg;
DROP PACKAGE history_br_pkg;
DROP PACKAGE history_pkg;
DROP PACKAGE favorite_br_pkg;
DROP PACKAGE favorite_pkg;
DROP PACKAGE basket_item_val_pkg;
-- Directory
DROP DIRECTORY EXPORT_CSV_DIR;
