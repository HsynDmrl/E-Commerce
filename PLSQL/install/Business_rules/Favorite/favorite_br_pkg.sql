create or replace package favorite_br_pkg as
  procedure favorite_exists(p_user_id    user_definition.user_id%type,
                            p_product_id product.product_id%type); -- Kullanicinin belirtilen urunu favorilere ekleyip eklemedigini kontrol eden prosedur
  procedure favorite_exists(p_user_id user_definition.user_id%type); --overloading -- Kullanicinin herhangi bir urunu favorilere ekleyip eklemedigini kontrol eden prosedur
  procedure favorite_not_exists(p_user_id    user_definition.user_id%type,
                                p_product_id product.product_id%type); -- Kullanicinin belirtilen urunu favorilere ekleyip eklemedigini kontrol eden prosedur
  procedure favorite_data_exists(p_count number); -- Favori urunlerin var olup olmadigini kontrol eden prosedur
end favorite_br_pkg;
/
create or replace package body favorite_br_pkg as
    procedure favorite_exists(p_user_id    user_definition.user_id%type,
                              p_product_id product.product_id%type) is
      v_count number;
    begin
      -- Kullanicinin belirtilen urunu favorilere ekleyip eklemedigini kontrol et
      select count(*)
        into v_count
        from favorite
       where user_id = p_user_id
         and product_id = p_product_id;
    
      -- Favori eklenmemisse hata firlat
      if v_count = 0 then
        global_exceptions.raise_invalid_input('User ' || p_user_id ||
                                              ' has not added product ' ||
                                              p_product_id ||
                                              ' to favorites.');
      end if;
    end favorite_exists;

    procedure favorite_exists(p_user_id user_definition.user_id%type) is
      v_count number;
    begin
      -- Kullanicinin herhangi bir urunu favorilere ekleyip eklemedigini kontrol et
      select count(*) into v_count from favorite where user_id = p_user_id;
    
      -- Favori eklenmemisse hata firlat
      if v_count = 0 then
        global_exceptions.raise_invalid_input('User ' || p_user_id ||
                                              ' has not added any product to favorites.');
      end if;
    end favorite_exists;

    procedure favorite_not_exists(p_user_id    user_definition.user_id%type,
                                  p_product_id product.product_id%type) is
      v_count number;
    begin
      -- Kullanicinin belirtilen urunu favorilere ekleyip eklemedigini kontrol et
      select count(*)
        into v_count
        from favorite
       where user_id = p_user_id
         and product_id = p_product_id;
    
      -- Favori zaten eklenmisse hata firlat
      if v_count > 0 then
        global_exceptions.raise_invalid_input('User ' || p_user_id ||
                                              ' has already added product ' ||
                                              p_product_id ||
                                              ' to favorites.');
      end if;
    end favorite_not_exists;

    procedure favorite_data_exists(p_count number) is
    begin
      -- Favori urunlerin var olup olmadigini kontrol et
      if p_count = 0 then
        global_exceptions.raise_no_data_found('No favorite product data found.');
      end if;
    end favorite_data_exists;
    
end favorite_br_pkg;
/
