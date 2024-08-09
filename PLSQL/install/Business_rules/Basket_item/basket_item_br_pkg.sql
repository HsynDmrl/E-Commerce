create or replace package basket_item_br_pkg is
    function check_basket_item(p_basket_id  basket.basket_id%type,
                               p_product_id product.product_id%type)
      return basket_item.basket_item_id%type; -- Sepette belirtilen urunun var olup olmadigini kontrol eden fonksiyon
    
    procedure data_exists(p_count integer); -- Veri var mi kontrol eden prosedur
    
    procedure basket_item_exists(p_basket_item_id basket_item.basket_item_id%type); -- Sepet ogesinin var olup olmadigini kontrol eden prosedur
end basket_item_br_pkg;
/
create or replace package body basket_item_br_pkg is
    function check_basket_item(p_basket_id  basket.basket_id%type,
                               p_product_id product.product_id%type)
      return basket_item.basket_item_id%type is
      v_basket_item_id basket_item.basket_item_id%type;
    begin
      begin
        -- Sepette belirtilen urunun var olup olmadigini kontrol et
        select basket_item_id
          into v_basket_item_id
          from basket_item
         where basket_id = p_basket_id
           and product_id = p_product_id;
      exception
        when no_data_found then
          -- urun bulunamazsa NULL dondur
          v_basket_item_id := null;
      end;
      return v_basket_item_id;
    end check_basket_item;

    procedure data_exists(p_count integer) is
    begin
      -- Sepette urun olup olmadigini kontrol et
      if p_count = 0 then
        global_exceptions.raise_no_data_found('No item found in basket');
      end if;                                     
    end data_exists;
    
    procedure basket_item_exists(p_basket_item_id basket_item.basket_item_id%type) is
      v_count integer;
    begin
      -- Sepet ogesinin var olup olmadigini kontrol et
      select count(*)
        into v_count
        from basket_item
       where basket_item_id = p_basket_item_id;
    
      -- Sepet ogesi bulunamazsa hata firlat
      if v_count = 0 then
        global_exceptions.raise_no_data_found('No item found with basket item id ' ||
                                              p_basket_item_id);
      end if;
    end basket_item_exists;
end basket_item_br_pkg;
/
