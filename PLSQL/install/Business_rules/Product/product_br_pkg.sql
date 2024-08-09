create or replace package product_br_pkg as
  procedure product_exists(p_product_id in product.product_id%type); -- Urun var mi kontrol eden prosedur
  procedure name_unique_add(p_product_name in product.product_name%type); -- Yeni urun adinin benzersizligini kontrol eden prosedur
  procedure name_unique_update(p_product_id   in product.product_id%type,
                               p_product_name in product.product_name%type); -- Guncellenen urun adinin benzersizligini kontrol eden prosedur
  procedure data_exists(p_count integer); -- Veri var mi kontrol eden prosedur
end product_br_pkg;
/
create or replace package body product_br_pkg as
    procedure product_exists(p_product_id in product.product_id%type) is
      v_count integer;
    begin
      -- Belirtilen urun ID'sine sahip bir kayit olup olmadigini kontrol et
      select count(*)
        into v_count
        from product
       where product_id = p_product_id;
    
      -- Kayit yoksa hata firlat
      if v_count = 0 then
        global_exceptions.raise_no_data_found('Product id ' ||
                                              p_product_id ||
                                              ' does not exist.');
      end if;
    end product_exists;

    procedure name_unique_add(p_product_name in product.product_name%type) is
      v_count integer;
    begin
      -- Belirtilen urun adina sahip bir kayit olup olmadigini kontrol et
      select count(*)
        into v_count
        from product
       where product_name = p_product_name;
    
      -- Kayit varsa hata firlat
      if v_count > 0 then
        global_exceptions.raise_invalid_input('Product name ' ||
                                              p_product_name ||
                                              ' is already in use.');
      end if;
    end name_unique_add;

    procedure name_unique_update(p_product_id   in product.product_id%type,
                                 p_product_name in product.product_name%type) is
      v_count integer;
    begin
      -- Belirtilen urun adina sahip baska bir kayit olup olmadigini kontrol et
      select count(*)
        into v_count
        from product
       where product_name = p_product_name
         and product_id <> p_product_id;
    
      -- Kayit varsa hata firlat
      if v_count > 0 then
        global_exceptions.raise_invalid_input('Product name ' ||
                                              p_product_name ||
                                              ' is already in use by another product.');
      end if;
    end name_unique_update;

    procedure data_exists(p_count integer) is
    begin
      -- Herhangi bir kayit yoksa hata firlat
      if p_count = 0 then
        global_exceptions.raise_no_data_found('No products found.');
      end if;
    end data_exists;
end product_br_pkg;
/
