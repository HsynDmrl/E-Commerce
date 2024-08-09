create or replace package favorite_pkg as
  type t_favorite_product_rec is record(
    favorite_id   favorite.favorite_id%type, -- Favori ID'si
    product_id    product.product_id%type, -- urun ID'si
    product_name  product.product_name%type, -- urun adi
    user_id       user_definition.user_id%type, -- Kullanici ID'si
    username      user_definition.username%type, -- Kullanici adi
    category_id   product.category_id%type, -- Kategori ID'si
    price         product.price%type, -- urun fiyati
    favorite_date favorite.favorite_date%type -- Favori ekleme tarihi
  );
  
  type l_favorite is table of t_favorite_product_rec; -- Favori urun listesi

  procedure add_favorite(p_user_id    user_definition.user_id%type,
                         p_product_id product.product_id%type); -- Favorilere urun ekleme proseduru
  procedure remove_favorite(p_user_id    user_definition.user_id%type,
                            p_product_id product.product_id%type); -- Favorilerden urun �ikarma proseduru
  procedure get_favorites_by_user(p_user_id   user_definition.user_id%type,
                                  p_favorites out l_favorite); -- Kullaniciya gore favori urunleri getiren prosedur
  procedure get_all_favorites(p_favorites out l_favorite); -- Tum favori urunleri getiren prosedur

end favorite_pkg;
/
create or replace package body favorite_pkg as
  procedure add_favorite(p_user_id    user_definition.user_id%type,
                         p_product_id product.product_id%type) is
  begin
    -- Kullanici ve urun var mi diye kontrol et ve favorinin zaten eklenmis olup olmadigini kontrol et
    user_br_pkg.user_existence(p_user_id);
    product_br_pkg.product_exists(p_product_id);
    favorite_br_pkg.favorite_not_exists(p_user_id, p_product_id);
  
    -- Favorilere ekle
    insert into favorite
      (favorite_id, user_id, product_id, favorite_date)
    values
      (favorite_seq.NEXTVAL, p_user_id, p_product_id, sysdate);
  end add_favorite;

  procedure remove_favorite(p_user_id    user_definition.user_id%type,
                            p_product_id product.product_id%type) is
  begin
    -- Kullanici ve urun var mi diye kontrol et ve favorinin var olup olmadigini kontrol et
    user_br_pkg.user_existence(p_user_id);
    product_br_pkg.product_exists(p_product_id);
    favorite_br_pkg.favorite_exists(p_user_id, p_product_id);
  
    -- Favorilerden sil
    delete from favorite
     where user_id = p_user_id
       and product_id = p_product_id;
  end remove_favorite;

  procedure get_favorites_by_user(p_user_id   user_definition.user_id%type,
                                  p_favorites out l_favorite) is
  begin
    -- Kullanicinin favorilerinin olup olmadigini kontrol et
    favorite_br_pkg.favorite_exists(p_user_id);
  
    -- Kullanicinin favorilerini getir
    select fp.favorite_id,
           u.user_id,
           u.username,
           p.product_id,
           p.product_name,
           p.category_id,
           p.price,
           fp.favorite_date
      bulk collect
      into p_favorites
      from product p, favorite fp, user_definition u
     where fp.product_id = p.product_id
       and fp.user_id = u.user_id
       and fp.user_id = p_user_id;
  
    -- Favori urunlerin var olup olmadigini kontrol et
    favorite_br_pkg.favorite_data_exists(p_favorites.count);
  end get_favorites_by_user;

  procedure get_all_favorites(p_favorites out l_favorite) is
  begin
    -- Tum favorileri getir
    select fp.favorite_id,
           p.product_id,
           p.product_name,
           u.user_id,
           u.username,
           p.category_id,
           p.price,
           fp.favorite_date
      bulk collect
      into p_favorites
      from product p, favorite fp, user_definition u
     where fp.product_id = p.product_id
       and fp.user_id = u.user_id;
  
    -- Favori urunlerin var olup olmadigini kontrol et
    favorite_br_pkg.favorite_data_exists(p_favorites.count);
  end get_all_favorites;

end favorite_pkg;
/
