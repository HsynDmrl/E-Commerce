create or replace package basket_pkg is
    function check_active_basket(p_user_id user_definition.user_id%type)
      return basket.basket_id%type; -- Aktif sepeti kontrol eden fonksiyon
    
    function create_basket(p_user_id user_definition.user_id%type)
      return basket.basket_id%type; -- Yeni sepet olusturan fonksiyon
    
    procedure delete_basket(p_user_id user_definition.user_id%type); -- Sepeti silen prosedur
end basket_pkg;
/
create or replace package body basket_pkg is
    function check_active_basket(p_user_id user_definition.user_id%type)
      return basket.basket_id%type is
    begin
      -- Aktif sepeti kontrol et
      -- basket_br_pkg'deki check_active_basket fonksiyonunu cagir
      return basket_br_pkg.check_active_basket(p_user_id);
    end check_active_basket;

    function create_basket(p_user_id user_definition.user_id%type)
      return basket.basket_id%type is
      v_basket_id basket.basket_id%type;
    begin
      -- Kullanicinin varligini kontrol et
      user_pkg.exists_by_id(p_user_id);
      -- Yeni sepet olustur ve sepet id'sini dondur
      insert into basket
        (basket_id, user_id, created_date)
      values
        (basket_seq.nextval, p_user_id, sysdate)
      returning basket_id into v_basket_id;
      return v_basket_id;
    end create_basket;

    procedure delete_basket(p_user_id user_definition.user_id%type) is
      v_basket_id basket.basket_id%type;
    begin
      -- Kullanicinin varligini kontrol et
      user_pkg.exists_by_id(p_user_id);
      -- Sepetin varligini kontrol et
      basket_br_pkg.basket_exists(p_user_id);
    
      -- Sepet id'sini al
      select basket_id
        into v_basket_id
        from basket
       where user_id = p_user_id;
    
      -- Sepete ait urunleri sil
      delete from basket_item where basket_id = v_basket_id;
    
      -- Sepeti sil
      delete from basket where user_id = p_user_id;
    end delete_basket;
    
end basket_pkg;
/
