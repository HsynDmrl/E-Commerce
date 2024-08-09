create or replace package basket_br_pkg is
    function check_active_basket(p_user_id user_definition.user_id%type)
      return basket.basket_id%type; -- Aktif sepeti kontrol eden fonksiyon
      
    v_basket_id basket.basket_id%type; -- Sepet ID degiskeni
    
    procedure basket_exists(p_user_id user_definition.user_id%type); -- Sepetin varligini kontrol eden prosedur
end basket_br_pkg;
/
create or replace package body basket_br_pkg is
    function check_active_basket(p_user_id user_definition.user_id%type)
      return basket.basket_id%type is
    begin
      begin
        -- Kullaniciya ait en son olusturulan sepeti getir
        select basket_id
          into v_basket_id
          from basket
         where user_id = p_user_id
         order by created_date desc
         fetch first 1 rows only;
      exception
        when no_data_found then
          -- Eger sepet bulunamazsa NULL dondur
          v_basket_id := null;
      end;
      return v_basket_id;
    end check_active_basket;
    
    procedure basket_exists(p_user_id user_definition.user_id%type) is
    begin
      begin
        -- Kullaniciya ait bir sepetin olup olmadigini kontrol et
        select basket_id
          into v_basket_id
          from basket
         where user_id = p_user_id;
      exception
        when no_data_found then
          -- Eger sepet bulunamazsa NULL atar
          v_basket_id := null;
      end;
    
      -- Eger sepet bulunamazsa hata firlat
      if v_basket_id is null then
        global_exceptions.raise_invalid_input('User id ' || p_user_id ||
                                              ' does not have a basket');
      end if;
    end basket_exists;
end basket_br_pkg;
/
