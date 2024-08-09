create or replace package order_detail_pkg as
  type order_detail_rec is record(
    order_detail_id order_detail.order_detail_id%type, -- Siparis detayi ID'si
    order_id        order_detail.order_id%type, -- Siparis ID'si
    product_id      order_detail.product_id%type, -- urun ID'si
    quantity        order_detail.quantity%type, -- Miktar
    product_name    product.product_name%type, -- urun adi
    price           product.price%type); -- urun fiyati
  type l_order_detail is table of order_detail_rec; -- Siparis detayi listesi

  procedure create_order_detail(p_order_id        in order_detail.order_id%type,
                                p_product_id      in order_detail.product_id%type,
                                p_quantity        in order_detail.quantity%type,
                                p_order_detail_id out order_detail.order_detail_id%type); -- Yeni siparis detayi olusturan prosedur

  procedure get_order_detail_list(p_order_id          in order_detail.order_id%type,
                                  p_order_detail_list out l_order_detail); -- Siparis detaylarini getiren prosedur

end order_detail_pkg;
/
create or replace package body order_detail_pkg as
    procedure create_order_detail(p_order_id        in order_detail.order_id%type,
                                  p_product_id      in order_detail.product_id%type,
                                  p_quantity        in order_detail.quantity%type,
                                  p_order_detail_id out order_detail.order_detail_id%type) is
    begin
      -- Siparisin var olup olmadigini kontrol et
      order_info_br_pkg.order_exists(p_order_id);
    
      -- urunun var olup olmadigini kontrol et
      product_pkg.exists_by_id(p_product_id);
    
      -- Miktarin gecerliligini kontrol et
      order_info_val_pkg.validate_total_amount(p_quantity);
    
      -- Siparis detayini ekle
      insert into order_detail
        (order_detail_id, order_id, product_id, quantity)
      values
        (order_detail_seq.NEXTVAL, p_order_id, p_product_id, p_quantity)
      returning order_detail_id into p_order_detail_id;
    end create_order_detail;

    procedure get_order_detail_list(p_order_id          in order_detail.order_id%type,
                                    p_order_detail_list out l_order_detail) is
    begin
      -- Siparis detaylarini getir
      select od.order_detail_id,
             od.order_id,
             od.product_id,
             od.quantity,
             p.product_name,
             p.price
        bulk collect
        into p_order_detail_list
        from order_detail od, product p
       where od.product_id = p.product_id
         and od.order_id = p_order_id;
    
      -- Siparis detaylarinin var olup olmadigini kontrol et
      order_detail_br_pkg.data_exists(p_order_detail_list.count);
    end get_order_detail_list;

end order_detail_pkg;
/
