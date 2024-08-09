create or replace package order_info_val_pkg is
  procedure validate_total_amount(p_total_amount in order_info.total_amount%type); -- Toplam tutarý dogrulayan prosedur
end order_info_val_pkg;
/
create or replace package body order_info_val_pkg is
  procedure validate_total_amount(p_total_amount in order_info.total_amount%type) is
  begin
    -- Toplam tutarýn gecerliligini kontrol et
    if p_total_amount <= 0 then
      global_exceptions.raise_invalid_input('Total amount must be greater than 0 (zero)');
    end if;
  end validate_total_amount;
end order_info_val_pkg;
/
