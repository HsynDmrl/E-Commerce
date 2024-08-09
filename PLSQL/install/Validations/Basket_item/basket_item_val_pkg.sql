create or replace package basket_item_val_pkg is
       procedure validate_quantity(p_quantity basket_item.quantity%type); -- Miktari dogrulayan prosedur
end basket_item_val_pkg;
/
create or replace package body basket_item_val_pkg is
       procedure validate_quantity(p_quantity basket_item.quantity%type) is
       begin
         -- Miktarin gecerliligini kontrol et
         if p_quantity <= 0 then
           global_exceptions.raise_invalid_input('Quantity must be greater than 0 (zero)');
         end if;
       end validate_quantity;
end basket_item_val_pkg;
/
