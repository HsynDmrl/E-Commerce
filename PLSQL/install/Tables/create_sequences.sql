-- create_sequences.sql

-- User Definition Tablosu icin Sequence
CREATE SEQUENCE user_definition_seq START WITH 1 INCREMENT BY 1;
UPDATE user_definition SET user_id = user_definition_seq.NEXTVAL;

-- Product Category Tablosu icin Sequence
CREATE SEQUENCE product_category_seq START WITH 1 INCREMENT BY 1;
UPDATE product_category SET category_id = product_category_seq.NEXTVAL;

-- Product Tablosu icin Sequence
CREATE SEQUENCE product_seq START WITH 1 INCREMENT BY 1;
UPDATE product SET product_id = product_seq.NEXTVAL;

-- Basket Tablosu icin Sequence
CREATE SEQUENCE basket_seq START WITH 1 INCREMENT BY 1;
UPDATE basket SET basket_id = basket_seq.NEXTVAL;

-- Basket Item Tablosu icin Sequence
CREATE SEQUENCE basket_item_seq START WITH 1 INCREMENT BY 1;
UPDATE basket_item SET basket_item_id = basket_item_seq.NEXTVAL;

-- Order_info Tablosu icin Sequence
CREATE SEQUENCE order_seq START WITH 1 INCREMENT BY 1;
UPDATE order_info SET order_id = order_seq.NEXTVAL;

-- Order Detail Tablosu icin Sequence
CREATE SEQUENCE order_detail_seq START WITH 1 INCREMENT BY 1;
UPDATE order_detail SET order_detail_id = order_detail_seq.NEXTVAL;

-- Favorite Products Tablosu icin Sequence
CREATE SEQUENCE favorite_seq START WITH 1 INCREMENT BY 1;
UPDATE favorite SET favorite_id = favorite_seq.NEXTVAL;

-- Purchase History Tablosu icin Sequence
CREATE SEQUENCE history_seq START WITH 1 INCREMENT BY 1;
UPDATE history SET history_id = history_seq.NEXTVAL;

commit;
