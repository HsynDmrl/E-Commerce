begin
    -- Yeni kategoriler ekle
    category_pkg.add_category('Clothing', null);
    category_pkg.add_category('Shoes', null);
    category_pkg.add_category('Woman Clothing', 1);
    category_pkg.add_category('Man Clothing', 1);
    category_pkg.add_category('Kids Clothing', 1);
    category_pkg.add_category('Woman Shoes', 2);
    category_pkg.add_category('Man Shoes', 2);
    category_pkg.add_category('Kids Shoes', 2);
end;
/
declare
    l_category category_pkg.l_category;
begin
    -- Tum kategorileri al
    category_pkg.get_all(l_category);
    
    for i in 1 .. l_category.count loop
        dbms_output.put_line('Category id: ' || l_category(i).category_id ||
                             ', Name: ' || l_category(i).category_name ||
                             ', Parent id: ' || l_category(i).parent_category_id);
    end loop;
end;
/
declare
    l_category category_pkg.t_category_rec;
begin
    -- Belirli bir kategoriyi ID ile aliyorum
    category_pkg.get_by_id(1, l_category);
    
    dbms_output.put_line('Category id: ' || l_category.category_id ||
                         ', Name: ' || l_category.category_name ||
                         ', Parent id: ' || l_category.parent_category_id);
end;
/
begin
    -- Kategoriyi guncelle
    category_pkg.update_category(1, 'Clothes');
end;
/
begin
    -- Kategoriyi sil
    category_pkg.delete_category(1);
end;
/
-- Kategori tablosu
select * from product_category;
/
