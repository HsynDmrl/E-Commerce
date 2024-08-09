create or replace package user_pkg as
  type user_login_rec is record (
    user_id user_definition.user_id%type,
    username user_definition.username%type
  );

  function login(p_username in user_definition.username%type,
                 p_password in user_definition.password%type)
    return user_login_rec; -- Giris fonksiyonu
  procedure change_password(p_user_id      in user_definition.user_id%type,
                            p_old_password in user_definition.password%type,
                            p_new_password in user_definition.password%type); -- Sifre degistirme proseduru
  procedure register_user(p_username in user_definition.username%type,
                          p_password in user_definition.password%type); -- Yeni kullanici kayit proseduru
  procedure exists_by_id(p_user_id in user_definition.user_id%type); -- Kullanici ID kontrol proseduru
end user_pkg;
/
create or replace package body user_pkg as
    function login(p_username in user_definition.username%type,
               p_password in user_definition.password%type)
    return user_login_rec is
    v_user user_login_rec;
begin
    -- Kullanici adi ve sifreyi dogrula
    user_br_pkg.check_login(p_username, p_password, v_user.user_id, v_user.username);

    -- Kullanici bilgilerini dondur
    return v_user; -- Kullanici bilgilerini dondur
end login;

    procedure change_password(p_user_id      in user_definition.user_id%type,
                              p_old_password in user_definition.password%type,
                              p_new_password in user_definition.password%type) is
    begin
      -- Eski sifreyi dogrula
      user_val_pkg.validate_password(p_old_password);
      -- Yeni sifreyi dogrula
      user_val_pkg.validate_password(p_new_password);
    
      -- Kullanicinin var olup olmadigini kontrol et
      user_br_pkg.user_existence(p_user_id);
      -- Eski sifrenin dogru olup olmadigini kontrol et
      user_br_pkg.password_check_by_user(p_user_id, p_old_password);
    
      -- Sifreyi guncelle
      update user_definition
         set password = hash_pkg.hash_password(p_new_password)
       where user_id = p_user_id;
    end change_password;

    procedure register_user(p_username in user_definition.username%type,
                            p_password in user_definition.password%type) is
    begin
      -- Sifreyi dogrula
      user_val_pkg.validate_password(p_password);
    
      -- Kullanici adinin mevcut olup olmadigini kontrol et
      user_br_pkg.check_registration(p_username);
    
      -- Yeni kullanici ekle
      insert into user_definition
        (user_id, username, password)
      values
        (user_definition_seq.NEXTVAL,
         p_username,
         hash_pkg.hash_password(p_password));
    end register_user;
    
    procedure exists_by_id(p_user_id in user_definition.user_id%type) is
    begin
      -- Kullanicinin var olup olmadigini kontrol et
      user_br_pkg.user_existence(p_user_id);
    end exists_by_id;
end user_pkg;
/
