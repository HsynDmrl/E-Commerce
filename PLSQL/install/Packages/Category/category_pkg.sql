create or replace package category_pkg as
    type t_category_rec is record (
        category_id product_category.category_id%type, -- Kategori ID'si
        category_name product_category.category_name%type, -- Kategori adi
        parent_category_id product_category.parent_category_id%type -- Parent kategori ID'si
    );

    type l_category is table of t_category_rec; -- Kategori listesi tipi
    
    procedure get_all(p_category out l_category); -- Tum kategorileri almak icin prosedur
    procedure get_by_id(p_category_id product_category.category_id%type,
                        p_category    out t_category_rec); -- Kategori ID'sine gore kategori almak icin prosedur
    procedure add_category(p_category_name      product_category.category_name%type,
                           p_parent_category_id product_category.parent_category_id%type := null); -- Yeni kategori eklemek icin prosedur
    procedure update_category(p_category_id        product_category.category_id%type,
                              p_category_name      product_category.category_name%type,
                              p_parent_category_id product_category.parent_category_id%type := null); -- Kategori guncellemek icin prosedur
    procedure delete_category(p_category_id product_category.category_id%type); -- Kategori silmek icin prosedur
end category_pkg;
/
create or replace package body category_pkg as
    procedure get_all(p_category out l_category) is
    begin
      -- Tum kategorileri al ve p_category degiskenine ata
      select category_id, category_name, parent_category_id
        bulk collect
        into p_category
        from product_category;
    
      -- Kategorilerin varligini kontrol et
      category_br_pkg.data_exists(p_category.count);
    end get_all;

    procedure get_by_id(p_category_id product_category.category_id%type,
                        p_category    out t_category_rec) is
    begin
      -- Kategori ID'sinin varligini kontrol et
      category_br_pkg.category_exists(p_category_id);
    
      -- Verilen kategori ID'sine gore kategoriyi al ve p_category degiskenine ata
      select category_id, category_name, parent_category_id
        into p_category
        from product_category
       where category_id = p_category_id;
    end get_by_id;

    procedure add_category(p_category_name      product_category.category_name%type,
                           p_parent_category_id product_category.parent_category_id%type := null) is
    begin
      -- Yeni kategorinin adinin benzersiz olup olmadigini kontrol et
      category_br_pkg.name_unique_add(p_category_name);
    
      -- Parent kategori ID'si varsa, varligini kontrol et
      if p_parent_category_id is not null then
        category_br_pkg.parent_category_exists(p_parent_category_id);
      end if;
    
      -- Yeni kategori ekle
      insert into product_category
        (category_id, category_name, parent_category_id)
      values
        (product_category_seq.NEXTVAL,
         p_category_name,
         p_parent_category_id);
    end add_category;

    procedure update_category(p_category_id        product_category.category_id%type,
                              p_category_name      product_category.category_name%type,
                              p_parent_category_id product_category.parent_category_id%type := null) is
    begin
      -- Guncellenecek kategori ID'sinin varligini kontrol et
      category_br_pkg.category_exists(p_category_id);
    
      -- Yeni kategori adinin benzersiz olup olmadigini kontrol et
      category_br_pkg.name_unique_update(p_category_id, p_category_name);
    
      -- Parent kategori ID'si varsa, varligini kontrol et
      if p_parent_category_id is not null then
        category_br_pkg.parent_category_exists(p_parent_category_id);
      end if;
    
      -- Kategoriyi guncelle
      update product_category
         set category_name      = p_category_name,
             parent_category_id = p_parent_category_id
       where category_id = p_category_id;
    end update_category;

    procedure delete_category(p_category_id product_category.category_id%type) is
    begin
      -- Silinecek kategori ID'sinin varligini kontrol et
      category_br_pkg.category_exists(p_category_id);
    
      -- Alt kategorilerin parent_category_id'sini null yap
      update product_category
         set parent_category_id = null
       where parent_category_id = p_category_id;
    
      -- Kategoriyi sil
      delete from product_category where category_id = p_category_id;
    end delete_category;
end category_pkg;
/
