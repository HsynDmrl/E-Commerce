create or replace package history_pkg as
    type purchase_history_rec is record (
        user_id order_info.user_id%type, -- Kullanici ID'si
        product_id order_detail.product_id%type, -- urun ID'si
        product_name product.product_name%type, -- urun adi
        purchase_date order_info.order_date%type, -- Satin alma tarihi
        quantity order_detail.quantity%type, -- Miktar
        price product.price%type, -- Fiyat
        total_amount number -- Toplam tutar
    );
    type l_history is table of purchase_history_rec; -- Satin alma gecmisi listesi

    procedure get_history(p_user_id          in order_info.user_id%type,
                          p_purchase_history out l_history); -- Kullanicinin satin alma gecmisini getiren prosedur

    procedure generate_history_csv(p_user_id in order_info.user_id%type); -- CSV formatinda satin alma gecmisi olusturan prosedur

    procedure get_csv_content(p_user_id     in order_info.user_id%type,
                              p_csv_content out clob); -- Kullanicinin CSV icerigini getiren prosedur

    function get_history_csv(p_user_id in order_info.user_id%type)
      return clob; -- Kullanicinin satin alma gecmisini CSV formatinda d�nduren fonksiyon

end history_pkg;
/
create or replace package body history_pkg as

    procedure get_history(p_user_id          in order_info.user_id%type,
                          p_purchase_history out l_history) is
    begin
      -- Kullanici var mi diye kontrol et
      user_pkg.exists_by_id(p_user_id);
    
      -- Kullanicinin siparis gecmisini getir
      select oi.user_id,
             od.product_id,
             p.product_name,
             oi.order_date,
             od.quantity,
             p.price,
             (od.quantity * p.price) as total_amount
        bulk collect
        into p_purchase_history
        from order_info oi,
             order_detail od,
             product p
       where oi.order_id = od.order_id
         and od.product_id = p.product_id
         and oi.user_id = p_user_id;
    
      -- Siparis detaylarinin var olup olmadigini kontrol et
      history_br_pkg.data_exists(p_purchase_history.count);
    end get_history;

    procedure generate_history_csv(p_user_id in order_info.user_id%type) is
      v_purchase_history l_history;
      v_csv_content      clob;
      v_line             varchar2(32767);
      v_total_amount     number := 0;
      v_total_items      number := 0;
    begin
      -- Kullanicinin siparis gecmisini getir
      get_history(p_user_id, v_purchase_history);
    
      -- CSV icerigini olustur
      v_csv_content := 'User ID,Product ID,Product Name,Purchase Date,Quantity,Price,Total Amount' || chr(10);
    
      for rec in 1 .. v_purchase_history.count loop
        v_line        := v_purchase_history(rec).user_id || ','
                      || v_purchase_history(rec).product_id || ','
                      || v_purchase_history(rec).product_name || ','
                      || to_char(v_purchase_history(rec).purchase_date, 'yyyy-mm-dd') || ','
                      || v_purchase_history(rec).quantity || ','
                      || v_purchase_history(rec).price || ','
                      || v_purchase_history(rec).total_amount || chr(10);
        v_csv_content := v_csv_content || v_line;
      
        v_total_amount := v_total_amount + v_purchase_history(rec).total_amount;
        v_total_items  := v_total_items + v_purchase_history(rec).quantity;
      end loop;
    
      -- Toplam miktar ve toplam tutari ekle
      v_line        := 'total items,' || v_total_items || ',' ||
                       'total amount,' || v_total_amount;
      v_csv_content := v_csv_content || v_line || chr(10);
    
      -- CSV icerigini history tablosuna ekle
      insert into history
        (history_id, user_id, csv_content)
      values
        (history_seq.NEXTVAL, p_user_id, v_csv_content);
    end generate_history_csv;

    procedure get_csv_content(p_user_id     in order_info.user_id%type,
                              p_csv_content out clob) is
    begin
      -- Kullanicinin CSV icerigini getir
      select csv_content
        into p_csv_content
        from history
       where user_id = p_user_id
       order by generated_date desc
       fetch first row only;
    end get_csv_content;

    function get_history_csv(p_user_id in order_info.user_id%type)
      return clob is
      v_csv_content clob;
    begin
      -- Kullanici var mi diye kontrol et
      user_pkg.exists_by_id(p_user_id);
    
      -- CSV icerigini getir
      get_csv_content(p_user_id, v_csv_content);
    
      return v_csv_content;
    end get_history_csv;

end history_pkg;
/
