create or replace package order_info_pkg as
    type order_rec is record (
        order_id order_info.order_id%type, -- Siparis ID'si
        user_id order_info.user_id%type, -- Kullanici ID'si
        order_date order_info.order_date%type, -- Siparis tarihi
        total_amount order_info.total_amount%type, -- Toplam tutar
        user_name user_definition.username%type -- Kullanici adi
    );

    procedure create_order(p_user_id  in order_info.user_id%type,
                           p_order_id out order_info.order_id%type); -- Yeni siparis olusturan prosedur

    procedure update_order_total(p_order_id     in order_info.order_id%type,
                                 p_total_amount in order_info.total_amount%type); -- Siparis toplam tutarini guncelleyen prosedur

    function get_order(p_order_id in order_info.order_id%type)
      return order_rec; -- Siparis bilgilerini getiren fonksiyon

    procedure delete_order(p_order_id in order_info.order_id%type); -- Siparisi silen prosedur

    procedure get_order_list(p_user_id    in order_info.user_id%type,
                             p_order_list out sys_refcursor); -- Kullanicinin siparis listesini getiren prosedur
    
    procedure get_order_detail_list(p_order_id          in order_detail.order_id%type,
                                    p_order_detail_list out sys_refcursor); -- Siparis detaylarini getiren prosedur

end order_info_pkg;
/
create or replace package body order_info_pkg as
    procedure create_order(p_user_id  in order_info.user_id%type,
                           p_order_id out order_info.order_id%type) is
    begin
      -- Kullanicinin var olup olmadigini kontrol et
      user_pkg.exists_by_id(p_user_id);
    
      -- Siparis ekle ve siparis ID'sini al
      insert into order_info
        (order_id, user_id, order_date, total_amount)
      values
        (order_seq.NEXTVAL, p_user_id, sysdate, 0)
      returning order_id into p_order_id;
    end create_order;

    procedure update_order_total(p_order_id     in order_info.order_id%type,
                                 p_total_amount in order_info.total_amount%type) is
    begin
      -- Siparisin var olup olmadigini kontrol et
      order_info_br_pkg.order_exists(p_order_id);
    
      -- Toplam tutarin gecerliligini kontrol et
      order_info_val_pkg.validate_total_amount(p_total_amount);
    
      -- Siparisin toplam tutarini guncelle
      update order_info
         set total_amount = p_total_amount
       where order_id = p_order_id;
    end update_order_total;

    function get_order(p_order_id in order_info.order_id%type)
      return order_rec is
      v_order order_rec;
    begin
      -- Siparisin var olup olmadigini kontrol et
      order_info_br_pkg.order_exists(p_order_id);
    
      -- Siparis detaylarini getir
      select od.order_id,
             od.user_id,
             od.order_date,
             od.total_amount,
             ud.username
        into v_order
        from order_info od, user_definition ud
       where od.user_id = ud.user_id
         and od.order_id = p_order_id;
    
      return v_order;
    end get_order;

    procedure delete_order(p_order_id in order_info.order_id%type) is
    begin
      -- Siparisin var olup olmadigini kontrol et
      order_info_br_pkg.order_exists(p_order_id);
    
      -- Siparis detaylarini sil
      delete from order_detail where order_id = p_order_id;
    
      -- Siparisi sil
      delete from order_info where order_id = p_order_id;
    end delete_order;

    procedure get_order_list(p_user_id    in order_info.user_id%type,
                             p_order_list out sys_refcursor) is
    begin
      -- Kullanicinin siparislerini getir
      open p_order_list for
        select od.order_id,
               od.user_id,
               od.order_date,
               od.total_amount,
               ud.username
          from order_info od, user_definition ud
         where od.user_id = ud.user_id
           and od.user_id = p_user_id;
    end get_order_list;
    
    procedure get_order_detail_list(p_order_id          in order_detail.order_id%type,
                                    p_order_detail_list out sys_refcursor) is
    begin
      -- Siparis detaylarini getir
      open p_order_detail_list for
        select od.order_detail_id,
               od.order_id,
               od.product_id,
               od.quantity,
               pd.product_name,
               pd.price
          from order_detail od, product pd
         where od.product_id = pd.product_id
           and od.order_id = p_order_id;
    end get_order_detail_list;
end order_info_pkg;
/
