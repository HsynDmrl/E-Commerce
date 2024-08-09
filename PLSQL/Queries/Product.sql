begin
  -- Yeni urunler ekle

  -- Woman Clothing
  product_pkg.add_product('Woman T-Shirt', 3, 50.4);
  product_pkg.add_product('Woman Shirt', 3, 100.2);
  product_pkg.add_product('Woman Jeans', 3, 75.5);
  product_pkg.add_product('Woman Jacket', 3, 120.3);
  product_pkg.add_product('Woman Blouse', 3, 70.4);
  product_pkg.add_product('Woman Sweatshirt', 3, 65.3);
  product_pkg.add_product('Woman Pants', 3, 90.1);
  product_pkg.add_product('Woman Hat', 3, 20.4);
  product_pkg.add_product('Woman Belt', 3, 35.7);
  product_pkg.add_product('Woman Gloves', 3, 40.8);

  -- Man Clothing
  product_pkg.add_product('Man T-Shirt', 4, 52.4);
  product_pkg.add_product('Man Shirt', 4, 102.2);
  product_pkg.add_product('Man Jeans', 4, 77.5);
  product_pkg.add_product('Man Jacket', 4, 122.3);
  product_pkg.add_product('Man Blouse', 4, 72.4);
  product_pkg.add_product('Man Sweatshirt', 4, 67.3);
  product_pkg.add_product('Man Pants', 4, 92.1);
  product_pkg.add_product('Man Hat', 4, 22.4);
  product_pkg.add_product('Man Belt', 4, 37.7);
  product_pkg.add_product('Man Gloves', 4, 42.8);

  -- Kids Clothing
  product_pkg.add_product('Kid T-Shirt', 5, 35.2);
  product_pkg.add_product('Kid Shirt', 5, 70.2);
  product_pkg.add_product('Kid Jeans', 5, 55.5);
  product_pkg.add_product('Kid Jacket', 5, 70.6);
  product_pkg.add_product('Kid Blouse', 5, 50.4);
  product_pkg.add_product('Kid Sweatshirt', 5, 40.3);
  product_pkg.add_product('Kid Pants', 5, 60.1);
  product_pkg.add_product('Kid Hat', 5, 15.4);
  product_pkg.add_product('Kid Belt', 5, 25.7);
  product_pkg.add_product('Kid Gloves', 5, 30.8);

  -- Woman Shoes
  product_pkg.add_product('Woman Sneakers', 6, 120.2);
  product_pkg.add_product('Woman Running Shoes', 6, 110.5);
  product_pkg.add_product('Woman Sandals', 6, 70.4);
  product_pkg.add_product('Woman Flip Flops', 6, 20.6);
  product_pkg.add_product('Woman Boots', 6, 150.3);
  product_pkg.add_product('Woman Classic Shoes', 6, 132.3);
  product_pkg.add_product('Woman Heels', 6, 100.8);

  -- Man Shoes
  product_pkg.add_product('Man Sneakers', 7, 120.2);
  product_pkg.add_product('Man Running Shoes', 7, 110.5);
  product_pkg.add_product('Man Sandals', 7, 70.4);
  product_pkg.add_product('Man Flip Flops', 7, 20.6);
  product_pkg.add_product('Man Boots', 7, 150.3);
  product_pkg.add_product('Man Classic Shoes', 7, 140.3);

  -- Kids Shoes
  product_pkg.add_product('Kid Sneakers', 8, 120.2);
  product_pkg.add_product('Kid Running Shoes', 8, 110.5);
  product_pkg.add_product('Kid Sandals', 8, 70.4);
  product_pkg.add_product('Kid Flip Flops', 8, 20.6);
  product_pkg.add_product('Kid Boots', 8, 150.3);
  product_pkg.add_product('Kid Classic Shoes', 8, 70.3);
  product_pkg.add_product('Kid Baby Sneakers', 8, 77.8);

end;
/
declare
  l_product sys_refcursor;
  v_product product_pkg.t_product_rec;
begin
  -- tum urunleri getir
  l_product := product_pkg.get_all;
  dbms_output.put_line('Product id, Name, Category id, Price, Category name');
  dbms_output.put_line('------------------------------------------------------');
  
  loop
    fetch l_product into v_product;
    exit when l_product%notfound;
    dbms_output.put_line(v_product.product_id || ', ' || v_product.product_name || ', ' ||
     v_product.category_id || ', ' || v_product.price || ', ' || v_product.category_name);
  end loop;
  
  -- cursor'i kapat
  close l_product;
end;
/
declare
  v_product product_pkg.t_product_rec;
begin
  -- urun bilgilerini id ile getir
  product_pkg.get_by_id(1, v_product);
  
  dbms_output.put_line('Product id: ' || v_product.product_id || ', Name: ' || v_product.product_name ||
   ', Category id: ' || v_product.category_id || ', Price: ' || v_product.price);
end;
/
begin
  -- urunu guncelle
  product_pkg.update_product(1, 'Updated product', 2, 15.50);
end;
/
begin
  -- urunu sil
  product_pkg.delete_product(1);
end;
/
declare
  l_product sys_refcursor;
  v_product_id product.product_id%type;
  v_product_name product.product_name%type;
  v_category_id product.category_id%type;
  v_price product.price%type;
  v_category_name product_category.category_name%type;
  v_favorite_count number;
begin
  -- urunleri filtrele ve sirala
  product_pkg.filter_and_sort(null, null, null, 'ASC', 'DESC', l_product);
  dbms_output.put_line('Product id, Name, Category id, Price, Category name, Favorite count');
  dbms_output.put_line('------------------------------------------------------');
  
  loop
    fetch l_product into v_product_id, v_product_name, v_category_id, v_price, v_category_name, v_favorite_count;
    exit when l_product%notfound;
    dbms_output.put_line(v_product_id || ', ' || v_product_name || ', ' || v_category_id || ', ' ||
     v_price || ', ' || v_category_name || ', ' || v_favorite_count);
  end loop;
  
  -- cursor'i kapat
  close l_product;
end;
/
