create or replace package category_br_pkg as
  procedure category_exists(p_category_id product_category.category_id%type); -- Kategori var mi kontrol eden prosedur
  procedure parent_category_exists(p_parent_category_id product_category.parent_category_id%type); -- Parent kategori var mi kontrol eden prosedur
  procedure name_unique_add(p_category_name product_category.category_name%type); -- Yeni kategori adinin benzersizligini kontrol eden prosedur
  procedure name_unique_update(p_category_id   product_category.category_id%type,
                               p_category_name product_category.category_name%type); -- Guncellenen kategori adinin benzersizligini kontrol eden prosedur
  procedure data_exists(p_count integer); -- Veri var mi kontrol eden prosedur
end category_br_pkg;
/
create or replace package body category_br_pkg as
    procedure category_exists(p_category_id product_category.category_id%type) is
      v_count integer;
    begin
      -- Verilen kategori ID'sine sahip kategorinin var olup olmadigini kontrol et
      select count(*)
        into v_count
        from product_category
       where category_id = p_category_id;
    
      -- Kategori yoksa hata firlat
      if v_count = 0 then
        global_exceptions.raise_no_data_found('Category id ' ||
                                              p_category_id ||
                                              ' does not exist.');
      end if;
    end category_exists;
    
    procedure parent_category_exists(p_parent_category_id product_category.parent_category_id%type) is
      v_count integer;
    begin
      -- Verilen parent kategori ID'sine sahip kategorinin var olup olmadigini kontrol et
      select count(*)
        into v_count
        from product_category
       where category_id = p_parent_category_id;
    
      -- Parent kategori yoksa hata firlat
      if v_count = 0 then
        global_exceptions.raise_no_data_found('Parent category id ' ||
                                              p_parent_category_id ||
                                              ' does not exist.');
      end if;
    end parent_category_exists;
    
    procedure name_unique_add(p_category_name product_category.category_name%type) is
      v_count integer;
    begin
      -- Verilen kategori adina sahip baska bir kategori olup olmadigini kontrol et
      select count(*)
        into v_count
        from product_category
       where category_name = p_category_name;
    
      -- Kategori adi zaten kullaniliyorsa hata firlat
      if v_count > 0 then
        global_exceptions.raise_invalid_input('Category name ' ||
                                              p_category_name ||
                                              ' is already in use.');
      end if;
    end name_unique_add;

    procedure name_unique_update(p_category_id   product_category.category_id%type,
                                 p_category_name product_category.category_name%type) is
      v_count integer;
    begin
      -- Guncellenen kategori adi baska bir kategori tarafindan kullaniliyor mu kontrol et
      select count(*)
        into v_count
        from product_category
       where category_name = p_category_name
         and category_id <> p_category_id;
    
      -- Kategori adi baska bir kategori tarafindan kullaniliyorsa hata firlat
      if v_count > 0 then
        global_exceptions.raise_invalid_input('Category name ' ||
                                              p_category_name ||
                                              ' is already in use by another category.');
      end if;
    end name_unique_update;

    procedure data_exists(p_count integer) is
    begin
      -- Kategori verisi yoksa hata firlat
      if p_count = 0 then
        global_exceptions.raise_no_data_found('No category found.');
      end if;
    end data_exists;
end category_br_pkg;
/
