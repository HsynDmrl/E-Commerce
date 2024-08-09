-- User Definition Tablosu
ALTER TABLE user_definition ADD (
    CONSTRAINT pk_user_definition PRIMARY KEY (user_id)
);

-- Product Category Tablosu
ALTER TABLE product_category ADD (
    CONSTRAINT pk_product_category PRIMARY KEY (category_id),
    CONSTRAINT fk_parent_category FOREIGN KEY (parent_category_id) REFERENCES product_category(category_id)
);

-- Product Tablosu
ALTER TABLE product ADD (
    CONSTRAINT pk_product PRIMARY KEY (product_id),
    CONSTRAINT fk_category FOREIGN KEY (category_id) REFERENCES product_category(category_id)
);

-- Basket Tablosu
ALTER TABLE basket ADD (
    CONSTRAINT pk_basket PRIMARY KEY (basket_id),
    CONSTRAINT fk_user_basket FOREIGN KEY (user_id) REFERENCES user_definition(user_id)
);

-- Basket Item Tablosu
ALTER TABLE basket_item ADD (
    CONSTRAINT pk_basket_item PRIMARY KEY (basket_item_id),
    CONSTRAINT fk_basket_basket_item FOREIGN KEY (basket_id) REFERENCES basket(basket_id),
    CONSTRAINT fk_product_basket_item FOREIGN KEY (product_id) REFERENCES product(product_id)
);

-- Order_info Tablosu
ALTER TABLE order_info ADD (
    CONSTRAINT pk_order PRIMARY KEY (order_id),
    CONSTRAINT fk_user_order FOREIGN KEY (user_id) REFERENCES user_definition(user_id)
);

-- Order Detail Tablosu
ALTER TABLE order_detail ADD (
    CONSTRAINT pk_order_detail PRIMARY KEY (order_detail_id),
    CONSTRAINT fk_order_order_detail FOREIGN KEY (order_id) REFERENCES order_info(order_id),
    CONSTRAINT fk_product_order_detail FOREIGN KEY (product_id) REFERENCES product(product_id)
);

-- Favorite Products Tablosu
ALTER TABLE favorite ADD (
    CONSTRAINT pk_favorite_product PRIMARY KEY (favorite_id),
    CONSTRAINT fk_user_favorite FOREIGN KEY (user_id) REFERENCES user_definition(user_id),
    CONSTRAINT fk_product_favorite FOREIGN KEY (product_id) REFERENCES product(product_id)
);

-- Purchase History Tablosu
ALTER TABLE history ADD (
    CONSTRAINT pk_history PRIMARY KEY (history_id),
    CONSTRAINT fk_user_history FOREIGN KEY (user_id) REFERENCES user_definition(user_id)
);

-- UNIQUE Constraint tanimlamalari
ALTER TABLE user_definition ADD CONSTRAINT uk_username UNIQUE (username);
ALTER TABLE product_category ADD CONSTRAINT uk_category_name UNIQUE (category_name);

