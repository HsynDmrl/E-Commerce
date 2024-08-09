begin
  -- Sepet ogesi ekle
  basket_item_pkg.add_basket_item(1, 3, 2);
  dbms_output.put_line('Basket item added');
exception
  when others then
    dbms_output.put_line(sqlerrm);
end;
/
declare
  p_user_id user_definition.user_id%type := 1;
  p_basket  basket_item_pkg.l_basket_item;
begin
  -- Kullaniciya gore sepet ogelerini getir
  p_basket := basket_item_pkg.get_basket_items_by_user(p_user_id);
  dbms_output.put_line('User id ' || p_user_id || ' Basket contents:');
  for i in 1 .. p_basket.count loop
    dbms_output.put_line('Basket item id: ' || p_basket(i).basket_item_id ||
                         ', Product id: ' || p_basket(i).product_id ||
                         ', Product name: ' || p_basket(i).product_name ||
                         ', Total price: ' || p_basket(i).price ||
                         ', Quantity: ' || p_basket(i).quantity);
  end loop;
end;
/
declare
  p_basket_id basket_item.basket_id%type := 1;
  p_basket    basket_item_pkg.l_basket_item;
begin
  -- Sepet ID'ye gore sepet ogelerini getir
  p_basket := basket_item_pkg.get_basket_items_by_basket_id(p_basket_id);
  dbms_output.put_line('Basket id ' || p_basket_id || ' Basket contents:');
  for i in 1 .. p_basket.count loop
    dbms_output.put_line('Basket item id: ' || p_basket(i).basket_item_id ||
                         ', Product id: ' || p_basket(i).product_id ||
                         ', Product name: ' || p_basket(i).product_name ||
                         ', Total price: ' || p_basket(i).price ||
                         ', Quantity: ' || p_basket(i).quantity);
  end loop;
end;
/
begin
  -- Sepet ogesi miktarini azalt
  basket_item_pkg.decrease_item_quantity(1);
  dbms_output.put_line('Basket item quantity decreased');
exception
  when others then
    dbms_output.put_line(sqlerrm);
end;
/
begin
  -- Sepet ogesi miktarini artir
  basket_item_pkg.increase_item_quantity(1);
  dbms_output.put_line('Basket item quantity increased');
exception
  when others then
    dbms_output.put_line(sqlerrm);
end;
/
begin
  -- Sepet ogesini sil
  basket_item_pkg.delete_basket_item(1);
  dbms_output.put_line('Basket item deleted');
exception
  when others then
    dbms_output.put_line(sqlerrm);
end;
/
declare
  p_user_id user_definition.user_id%type := 1;
begin
  -- Sepeti sil
  basket_pkg.delete_basket(p_user_id);
  dbms_output.put_line('Basket deleted.');
exception
  when others then
    dbms_output.put_line('error: ' || sqlerrm);
end;
/
-- Sepeti goruntule
select * from basket where user_id = 1;
/
-- Sepet ogelerini goruntule
  select * from basket_item;
/
