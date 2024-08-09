SPOOL install_output.log;

PROMPT Running create_tables.sql
@install/Tables/create_tables.sql;

PROMPT Running create_constraints.sql
@install/Tables/create_constraints.sql;

PROMPT Running create_sequences.sql
@install/Tables/create_sequences.sql;

PROMPT Running global_exceptions.sql
@install/Exceptions/global_exceptions.sql;

PROMPT Running hash_pkg.sql
@install/Packages/Hash/hash_pkg.sql;

PROMPT Running category_br_pkg.sql
@install/Business_rules/Category/category_br_pkg.sql;

PROMPT Running user_val_pkg.sql
@install/Validations/User/user_val_pkg.sql;

PROMPT Running user_br_pkg.sql
@install/Business_rules/User/user_br_pkg.sql;

PROMPT Running user_pkg.sql
@install/Packages/User/user_pkg.sql;

PROMPT Running category_pkg.sql
@install/Packages/Category/category_pkg.sql;

PROMPT Running product_br_pkg.sql
@install/Business_rules/Product/product_br_pkg.sql;

PROMPT Running product_pkg.sql
@install/Packages/Product/product_pkg.sql;

PROMPT Running basket_br_pkg.sql
@install/Business_rules/Basket/basket_br_pkg.sql;

PROMPT Running basket_pkg.sql
@install/Packages/Basket/basket_pkg.sql;

PROMPT Running basket_item_val_pkg.sql
@install/Validations/Basket_item/basket_item_val_pkg.sql;

PROMPT Running basket_item_br_pkg.sql
@install/Business_rules/Basket_item/basket_item_br_pkg.sql;

PROMPT Running basket_item_pkg.sql
@install/Packages/Basket_item/basket_item_pkg.sql;

PROMPT Running order_info_val_pkg.sql
@install/Validations/Order_info/order_info_val_pkg.sql;

PROMPT Running order_info_br_pkg.sql
@install/Business_rules/Order_info/order_info_br_pkg.sql;

PROMPT Running order_info_pkg.sql
@install/Packages/Order_info/order_info_pkg.sql;

PROMPT Running order_detail_br_pkg.sql
@install/Business_rules/Order_detail/order_detail_br_pkg.sql;

PROMPT Running order_detail_pkg.sql
@install/Packages/Order_detail/order_detail_pkg.sql;

PROMPT Running purchase_pkg.sql
@install/Packages/Purchase/purchase_pkg.sql;

PROMPT Running history_br_pkg.sql
@install/Business_rules/History/history_br_pkg.sql;

PROMPT Running history_pkg.sql
@install/Packages/History/history_pkg.sql;

PROMPT Running favorite_br_pkg.sql
@install/Business_rules/Favorite/favorite_br_pkg.sql;

PROMPT Running favorite_pkg.sql
@install/Packages/Favorite/favorite_pkg.sql;

PROMPT Creating directory EXPORT_CSV_DIR
CREATE OR REPLACE DIRECTORY EXPORT_CSV_DIR AS '/opt/oracle/oradata/ORCLCDB/exportCSV';

SPOOL OFF;
