create or replace package order_info_br_pkg as
  procedure order_exists(p_order_id in order_info.order_id%type); -- Siparis var mi kontrol eden prosedur
  procedure data_exists(p_count integer); -- Veri var mi kontrol eden prosedur
end order_info_br_pkg;
/
create or replace package body order_info_br_pkg as
    procedure order_exists(p_order_id in order_info.order_id%type) is
      v_count number;
    begin
      -- Siparisin var olup olmadigini kontrol et
      select count(*)
        into v_count
        from order_info
       where order_id = p_order_id;
    
      -- Siparis bulunamazsa hata firlat
      if v_count = 0 then
        global_exceptions.raise_no_data_found('Order not found for id ' ||
                                              p_order_id);
      end if;
    end order_exists;

    procedure data_exists(p_count integer) is
    begin
      -- Siparislerin var olup olmadigini kontrol et
      if p_count = 0 then
        global_exceptions.raise_no_data_found('No orders found');
      end if;
    end data_exists;
end order_info_br_pkg;
/
