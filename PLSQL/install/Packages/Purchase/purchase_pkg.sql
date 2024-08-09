create or replace package purchase_pkg is
    procedure complete_purchase(p_user_id user_definition.user_id%type); -- Satin alma islemini tamamlayan prosedur
end purchase_pkg;
/
create or replace package body purchase_pkg is
    procedure complete_purchase(p_user_id user_definition.user_id%type) is
      v_order_id     order_info.order_id%type;
      v_total_amount order_info.total_amount%type := 0;
      v_basket_items basket_item_pkg.l_basket_item;
    begin
      -- Kullanici var mi diye kontrol et
      user_pkg.exists_by_id(p_user_id);
      
      -- Sepetteki urunleri al
      v_basket_items := basket_item_pkg.get_basket_items_by_user(p_user_id);
      basket_item_br_pkg.data_exists(v_basket_items.count);
    
      -- order_info tablosuna yeni bir siparis ekle
      order_info_pkg.create_order(p_user_id, v_order_id);
    
      -- Sepetteki urunleri order_detail tablosuna ekle ve toplam tutari hesapla
      for i in 1 .. v_basket_items.count loop
        order_detail_pkg.create_order_detail(p_order_id        => v_order_id,
                                             p_product_id      => v_basket_items(i).product_id,
                                             p_quantity        => v_basket_items(i).quantity,
                                             p_order_detail_id => v_basket_items(i).basket_item_id);
        v_total_amount := v_total_amount + v_basket_items(i).quantity *
                          product_pkg.get_product_price(v_basket_items(i).product_id);
      end loop;
    
      -- order_info tablosundaki total_amount alanini guncelle
      order_info_pkg.update_order_total(v_order_id, v_total_amount);
    
      -- Sepeti bosalt
      basket_pkg.delete_basket(p_user_id);
    end complete_purchase;
end purchase_pkg;
/
