create or replace package basket_item_pkg is
    type basket_item_rec is record(
        basket_item_id basket_item.basket_item_id%type, -- Sepet ogesi ID'si
        product_id basket_item.product_id%type, -- urun ID'si
        quantity basket_item.quantity%type, -- Miktar
        product_name product.product_name%type, -- urun adi
        price product.price%type -- Fiyat
    );

    type l_basket_item is table of basket_item_rec; -- Sepet ogesi listesi

    v_basket_id basket.basket_id%type; -- Sepet ID'si degiskeni
    v_basket_item_id basket_item.basket_item_id%type; -- Sepet ogesi ID'si degiskeni
    v_quantity basket_item.quantity%type; -- Miktar degiskeni

    procedure add_basket_item(p_user_id    user_definition.user_id%type,
                              p_product_id product.product_id%type,
                              p_quantity   basket_item.quantity%type); -- Sepete oge ekleme proseduru

    procedure delete_basket_item(p_basket_item_id basket_item.basket_item_id%type); -- Sepet ogesini silme proseduru

    procedure decrease_item_quantity(p_basket_item_id basket_item.basket_item_id%type); -- Sepet ogesi miktarini azaltma proseduru

    procedure increase_item_quantity(p_basket_item_id basket_item.basket_item_id%type); -- Sepet ogesi miktarini artirma proseduru

    function get_basket_items_by_user(p_user_id user_definition.user_id%type)
      return l_basket_item; -- Kullaniciya gore sepet ogelerini getiren fonksiyon

    function get_basket_items_by_basket_id(p_basket_id basket.basket_id%type)
      return l_basket_item; -- Sepet ID'sine gore sepet ogelerini getiren fonksiyon

end basket_item_pkg;
/
create or replace package body basket_item_pkg is
    procedure add_basket_item(p_user_id    user_definition.user_id%type,
                              p_product_id product.product_id%type,
                              p_quantity   basket_item.quantity%type) is
    begin
      -- Kullanicinin var olup olmadigini kontrol et
      user_pkg.exists_by_id(p_user_id);
    
      -- urunun var olup olmadigini kontrol et
      product_pkg.exists_by_id(p_product_id);
    
      -- Miktarin gecerli olup olmadigini kontrol et
      basket_item_val_pkg.validate_quantity(p_quantity);
    
      -- Kullanicinin aktif sepetini kontrol et, yoksa yeni sepet olustur
      v_basket_id := basket_pkg.check_active_basket(p_user_id);
      if v_basket_id is null then
        v_basket_id := basket_pkg.create_basket(p_user_id);
      end if;
    
      -- Sepette belirtilen urunun olup olmadigini kontrol et
      v_basket_item_id := basket_item_br_pkg.check_basket_item(v_basket_id, p_product_id);
      if v_basket_item_id is null then
        -- urun sepette yoksa yeni sepet ogesi ekle
        insert into basket_item
          (basket_item_id, basket_id, product_id, quantity)
        values
          (basket_item_seq.NEXTVAL, v_basket_id, p_product_id, p_quantity);
      else
        -- urun sepette varsa miktarini artir
        update basket_item
           set quantity = quantity + p_quantity
         where basket_item_id = v_basket_item_id;
      end if;
    end add_basket_item;

    procedure delete_basket_item(p_basket_item_id basket_item.basket_item_id%type) is
    begin
      -- Sepet ogesinin var olup olmadigini kontrol et
      basket_item_br_pkg.basket_item_exists(p_basket_item_id);
    
      -- Sepet ogesini sil
      delete from basket_item where basket_item_id = p_basket_item_id;
    end delete_basket_item;

    procedure decrease_item_quantity(p_basket_item_id basket_item.basket_item_id%type) is
    begin
      -- Sepet ogesinin var olup olmadigini kontrol et
      basket_item_br_pkg.basket_item_exists(p_basket_item_id);
    
      -- Sepet ogesinin miktarini al
      select quantity
        into v_quantity
        from basket_item
       where basket_item_id = p_basket_item_id;
    
      if v_quantity <= 1 then
        -- Miktar 1 veya daha az ise sepet ogesini sil
        delete from basket_item where basket_item_id = p_basket_item_id;
      else
        -- Miktari azalt
        update basket_item
           set quantity = quantity - 1
         where basket_item_id = p_basket_item_id;
      end if;
    end decrease_item_quantity;

    procedure increase_item_quantity(p_basket_item_id basket_item.basket_item_id%type) is
    begin
      -- Sepet ogesinin var olup olmadigini kontrol et
      basket_item_br_pkg.basket_item_exists(p_basket_item_id);
    
      -- Miktari artir
      update basket_item
         set quantity = quantity + 1
       where basket_item_id = p_basket_item_id;
    end increase_item_quantity;

    function get_basket_items_by_user(p_user_id user_definition.user_id%type)
      return l_basket_item is
      v_basket_items l_basket_item := l_basket_item();
    begin
      -- Kullanicinin var olup olmadigini kontrol et
      user_pkg.exists_by_id(p_user_id);
    
      -- Kullanicinin sepetinin olup olmadigini kontrol et
      basket_br_pkg.basket_exists(p_user_id);
    
      -- Kullanicinin aktif sepetini kontrol et
      v_basket_id := basket_pkg.check_active_basket(p_user_id);
    
      if v_basket_id is not null then
        -- Kullanicinin sepetindeki urunleri getir
        select bi.basket_item_id,
               bi.product_id,
               bi.quantity,
               p.product_name,
               p.price
          bulk collect
          into v_basket_items
          from basket_item bi, product p
         where bi.product_id = p.product_id
           and bi.basket_id = v_basket_id;
      
        -- Sepette urun olup olmadigini kontrol et
        basket_item_br_pkg.data_exists(v_basket_items.count);
      end if;
    
      return v_basket_items;
    end get_basket_items_by_user;

    function get_basket_items_by_basket_id(p_basket_id basket.basket_id%type)
      return l_basket_item is
      v_basket_items l_basket_item := l_basket_item();
    begin
      -- Sepetteki urunleri getir
      select bi.basket_item_id,
             bi.product_id,
             bi.quantity,
             p.product_name,
             p.price
        bulk collect
        into v_basket_items
        from basket_item bi, product p
       where bi.product_id = p.product_id
         and bi.basket_id = p_basket_id;
    
      return v_basket_items;
    end get_basket_items_by_basket_id;

end basket_item_pkg;
/
