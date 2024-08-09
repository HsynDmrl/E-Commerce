-- Favori ekleme
declare
    v_user_id user_definition.user_id%type := 1;
    v_product_id user_definition.user_id%type := 5;
begin
    favorite_pkg.add_favorite(p_user_id => v_user_id, p_product_id => v_product_id);
    dbms_output.put_line('Favorite added.');
end;
/
-- Favori silme
declare
    v_user_id user_definition.user_id%type := 1;
    v_product_id user_definition.user_id%type := 5;
begin
    favorite_pkg.remove_favorite(v_user_id, v_product_id);
    dbms_output.put_line('Favorite removed.');
end;
/
-- Kullanýcý ID'ye göre favorileri getirme
declare
  v_user_id user_definition.user_id%type := 1; 
  v_favorites favorite_pkg.l_favorite;
begin
  favorite_pkg.get_favorites_by_user(v_user_id, v_favorites);
  for i in 1..v_favorites.count loop
      dbms_output.put_line('Favorite id: ' || v_favorites(i).favorite_id ||
                           ', Product id: ' || v_favorites(i).product_id ||
                           ', Product name: ' || v_favorites(i).product_name ||
                           ', User id: ' || v_favorites(i).user_id ||
                           ', Username: ' || v_favorites(i).username ||
                           ', Category id: ' || v_favorites(i).category_id ||
                           ', Price: ' || v_favorites(i).price ||
                           ', Favorite date: ' || v_favorites(i).favorite_date);
    end loop;
end;
/
-- Tüm favorileri getirme
declare
  v_favorites favorite_pkg.l_favorite;
begin
  favorite_pkg.get_all_favorites(v_favorites);

  for i in 1..v_favorites.count loop
      dbms_output.put_line('Favorite id: ' || v_favorites(i).favorite_id ||
                           ', Product id: ' || v_favorites(i).product_id ||
                           ', Product name: ' || v_favorites(i).product_name ||
                           ', User id: ' || v_favorites(i).user_id ||
                           ', Username: ' || v_favorites(i).username ||
                           ', Category id: ' || v_favorites(i).category_id ||
                           ', Price: ' || v_favorites(i).price ||
                           ', Favorite date: ' || v_favorites(i).favorite_date);
    end loop;
end;
/
select * from favorite;
/
