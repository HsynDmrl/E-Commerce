create or replace package product_pkg as
  type t_product_rec is record(
    product_id   product.product_id%type, -- Urun ID'si
    product_name product.product_name%type, -- Urun adi
    category_id  product.category_id%type, -- Kategori ID'si
    price        product.price%type, -- Urun fiyati
    category_name product_category.category_name%type -- Kategori adi
  );

  function get_all return sys_refcursor; -- Tum urunleri getiren fonksiyon
  procedure get_by_id(p_product_id product.product_id%type,
                      p_product    out t_product_rec); -- Urun ID'sine gore urunu getiren prosedur
  procedure add_product(p_product_name product.product_name%type,
                        p_category_id  product.category_id%type,
                        p_price        product.price%type); -- Yeni urun ekleyen prosedur
  procedure update_product(p_product_id   product.product_id%type,
                           p_product_name product.product_name%type,
                           p_category_id  product.category_id%type,
                           p_price        product.price%type); -- Urun guncelleyen prosedur
  procedure delete_product(p_product_id product.product_id%type); -- Urun silen prosedur
  procedure exists_by_id(p_product_id product.product_id%type); -- Urun ID'sine gore urunun varligini kontrol eden prosedur
  procedure filter_and_sort(p_category_id    product.category_id%type := null,
                            p_min_price      product.price%type := null,
                            p_max_price      product.price%type := null,
                            p_sort_order     varchar2 := 'ASC',
                            p_favorite_order varchar2 := 'DESC',
                            p_product        out sys_refcursor); -- Urunleri filtreleyen ve siralayan prosedur

  function get_product_price(p_product_id in product.product_id%type)
    return product.price%type; -- Urun fiyatini getiren fonksiyon
end product_pkg;
/
create or replace package body product_pkg as
  function get_all return sys_refcursor is
    v_cursor sys_refcursor;
    v_count integer;
  begin
    -- Tum urunleri ve kategorilerini getir
    select count(*)
      into v_count
      from product p, product_category c
     where p.category_id = c.category_id;
    
    -- Veri varligini kontrol et
    product_br_pkg.data_exists(v_count);
    
    open v_cursor for
      select p.product_id,
             p.product_name,
             p.category_id,
             p.price,
             c.category_name
        from product p, product_category c
       where p.category_id = c.category_id;
    return v_cursor;
  end get_all;

  procedure get_by_id(p_product_id product.product_id%type,
                      p_product    out t_product_rec) is
  begin
    -- urunun var olup olmadigini kontrol et
    product_br_pkg.product_exists(p_product_id);
  
    -- urunu ve kategorisini getir
    select p.product_id,
           p.product_name,
           p.category_id,
           p.price,
           c.category_name
      into p_product.product_id,
           p_product.product_name,
           p_product.category_id,
           p_product.price,
           p_product.category_name
      from product p, product_category c
     where p.category_id = c.category_id
       and p.product_id = p_product_id;
  end get_by_id;

  procedure add_product(p_product_name product.product_name%type,
                        p_category_id  product.category_id%type,
                        p_price        product.price%type) is
  begin
    -- Kategorinin var olup olmadigini kontrol et
    category_br_pkg.category_exists(p_category_id);
  
    -- Yeni urunu ekle
    insert into product
      (product_id, product_name, category_id, price)
    values
      (product_seq.NEXTVAL, p_product_name, p_category_id, p_price);
  end add_product;

  procedure update_product(p_product_id   product.product_id%type,
                           p_product_name product.product_name%type,
                           p_category_id  product.category_id%type,
                           p_price        product.price%type) is
  begin
    -- urunun var olup olmadigini kontrol et
    product_br_pkg.product_exists(p_product_id);
  
    -- Kategorinin var olup olmadigini kontrol et
    category_br_pkg.category_exists(p_category_id);
  
    -- urunu guncelle
    update product
       set product_name = p_product_name,
           category_id  = p_category_id,
           price        = p_price
     where product_id = p_product_id;
  end update_product;

  procedure delete_product(p_product_id product.product_id%type) is
  begin
    -- urunun var olup olmadigini kontrol et
    product_br_pkg.product_exists(p_product_id);
  
    -- urunu sil
    delete from product where product_id = p_product_id;
  end delete_product;

  procedure exists_by_id(p_product_id product.product_id%type) is
  begin
    -- urunun var olup olmadigini kontrol et
    product_br_pkg.product_exists(p_product_id);
  end exists_by_id;

  procedure filter_and_sort(p_category_id    product.category_id%type := null,
                            p_min_price      product.price%type := null,
                            p_max_price      product.price%type := null,
                            p_sort_order     varchar2 := 'ASC',
                            p_favorite_order varchar2 := 'DESC',
                            p_product        out sys_refcursor) is
  begin
    -- Kategorinin var olup olmadigini kontrol et (varsa)
    if p_category_id is not null then
      category_br_pkg.category_exists(p_category_id);
    end if;
  
    -- urunleri filtrele ve sirala
    open p_product for
      select p.product_id,
             p.product_name,
             p.category_id,
             p.price,
             c.category_name,
             count(fp.user_id) as favorite_count
        from product p, favorite fp, product_category c
       where p.product_id = fp.product_id(+)
         and p.category_id = c.category_id
         and (p_category_id is null or p.category_id = p_category_id)
         and (p_min_price is null or p.price >= p_min_price)
         and (p_max_price is null or p.price <= p_max_price)
       group by p.product_id,
                p.product_name,
                p.category_id,
                p.price,
                c.category_name
       order by case p_favorite_order
                  when 'DESC' then
                   favorite_count
                  else
                   0
                end desc,
                case p_sort_order
                  when 'DESC' then
                   p.price
                end desc,
                p.price asc;
  end filter_and_sort;

  function get_product_price(p_product_id in product.product_id%type)
    return product.price%type is
    v_price product.price%type;
  begin
    -- urunun fiyatini getir
    select price into v_price from product where product_id = p_product_id;
    return v_price;
  end get_product_price;

end product_pkg;
/
