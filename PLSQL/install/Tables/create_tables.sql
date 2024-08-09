-- User Definition Tablosu
CREATE TABLE user_definition (
    user_id NUMBER,
    username VARCHAR2(50) NOT NULL,
    password VARCHAR2(64) NOT NULL
);

-- Product Category Tablosu
CREATE TABLE product_category (
    category_id NUMBER,
    category_name VARCHAR2(100) NOT NULL,
    parent_category_id NUMBER
);

-- Product Tablosu
CREATE TABLE product (
    product_id NUMBER,
    product_name VARCHAR2(100) NOT NULL,
    category_id NUMBER NOT NULL,
    price NUMBER(10,2) NOT NULL
);

-- Basket Tablosu
CREATE TABLE basket (
    basket_id NUMBER,
    user_id NUMBER NOT NULL,
    created_date date default sysdate
);

-- Basket Item Tablosu
CREATE TABLE basket_item (
    basket_item_id NUMBER,
    basket_id NUMBER NOT NULL,
    product_id NUMBER NOT NULL,
    quantity NUMBER DEFAULT 1 NOT NULL
);

-- Order_info Tablosu
CREATE TABLE order_info (
    order_id NUMBER,
    user_id NUMBER NOT NULL,
    order_date DATE DEFAULT SYSDATE NOT NULL,
    total_amount NUMBER(10,2) NOT NULL
);
-- Order Detail Tablosu
CREATE TABLE order_detail (
    order_detail_id NUMBER,
    order_id NUMBER NOT NULL,
    product_id NUMBER NOT NULL,
    quantity NUMBER DEFAULT 1 NOT NULL
);

-- Favorite Products Tablosu
CREATE TABLE favorite (
    favorite_id NUMBER,
    user_id NUMBER NOT NULL,
    product_id NUMBER NOT NULL,
    favorite_date DATE DEFAULT SYSDATE NOT NULL
);

-- Purchase History Tablosu
CREATE TABLE history (
    history_id NUMBER,
    user_id NUMBER,
    csv_content CLOB,
    generated_date DATE DEFAULT SYSDATE NOT NULL
);
