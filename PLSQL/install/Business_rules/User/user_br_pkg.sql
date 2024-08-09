create or replace package user_br_pkg as
  procedure user_existence(p_user_id in user_definition.user_id%type); -- Kullanici varligini kontrol eden prosedur
  procedure password_check_by_user(p_user_id  in user_definition.user_id%type,
                                   p_password in user_definition.password%type); -- Kullaniciya gore sifre kontrol eden prosedur
  procedure password_check_by_hash(expected_password in user_definition.password%type,
                                   hashed_password   in raw); -- Hashlenmis sifreyi kontrol eden prosedur
  procedure username_exists(p_username in user_definition.username%type); -- Kullanici adinin varligini kontrol eden prosedur
  procedure check_login(p_username in user_definition.username%type,
                        p_password in user_definition.password%type,
                        p_user_id  out user_definition.user_id%type,
                        p_return_username out user_definition.username%type); -- Giris kontrolu yapan prosedur
  procedure check_registration(p_username in user_definition.username%type); -- Kullanici adi kaydi kontrol eden prosedur
end user_br_pkg;
/
create or replace package body user_br_pkg as
    procedure user_existence(p_user_id in user_definition.user_id%type) is
      v_count number;
    begin
      -- Kullanici ID'sine gore kullanici sayisini kontrol ediyorum
      select count(*)
        into v_count
        from user_definition
       where user_id = p_user_id;
    
      -- Kullanici yoksa hata firlatiyorum
      if v_count = 0 then
        global_exceptions.raise_no_data_found('User does not exist.');
      end if;
    end user_existence;

    procedure password_check_by_user(p_user_id  in user_definition.user_id%type,
                                     p_password in user_definition.password%type) is
      current_password user_definition.password%type;
    begin
      -- Kullanicinin sifresini aliyorum
      select password
        into current_password
        from user_definition
       where user_id = p_user_id;
    
      -- Sifre uyusmuyorsa hata firlatiyorum
      if current_password != hash_pkg.hash_password(p_password) then
        global_exceptions.raise_invalid_input('Incorrect password');
      end if;
    end password_check_by_user;

    procedure password_check_by_hash(expected_password in user_definition.password%type,
                                     hashed_password   in raw) is
    begin
      -- Sifre uyusmuyorsa hata firlatiyorum
      if expected_password != hashed_password then
        global_exceptions.raise_invalid_input('Incorrect password');
      end if;
    end password_check_by_hash;

    procedure username_exists(p_username in user_definition.username%type) is
      v_count number;
    begin
      -- Kullanici adina gore kullanici sayisini kontrol ediyorum
      select count(*)
        into v_count
        from user_definition
       where username = p_username;
    
      -- Kullanici adi yoksa hata firlatiyorum
      if v_count = 0 then
        global_exceptions.raise_no_data_found('Username ' || p_username ||
                                              ' does not exist.');
      end if;
    end username_exists;

    procedure check_login(p_username in user_definition.username%type,
                      p_password in user_definition.password%type,
                      p_user_id  out user_definition.user_id%type,
                      p_return_username out user_definition.username%type) is
    hashed_password   raw(2000);
    expected_password user_definition.password%type;
begin
    -- Kullanici adi ve sifreyi dogruluyorum
    user_val_pkg.validate_username(p_username);
    user_val_pkg.validate_password(p_password);

    -- Kullanici adinin varligini kontrol ediyorum
    username_exists(p_username);

    -- Kullanici bilgilerini aliyorum
    select password, user_id, username
      into expected_password, p_user_id, p_return_username
      from user_definition
     where username = p_username;

    -- Girilen sifreyi hash'leyip kontrol ediyorum
    hashed_password := hash_pkg.hash_password(p_password);
    password_check_by_hash(expected_password, hashed_password);
end check_login;

    procedure check_registration(p_username in user_definition.username%type) is
      v_count number;
    begin
      -- Kullanici adini dogruluyorum
      user_val_pkg.validate_username(p_username);
    
      -- Kullanici adinin varligini kontrol ediyorum
      select count(*)
        into v_count
        from user_definition
       where username = p_username;
    
      -- Kullanici adi varsa hata firlatiyorum
      if v_count > 0 then
        global_exceptions.raise_invalid_input('Username ' || p_username ||
                                              ' already exists.');
      end if;
    end check_registration;
end user_br_pkg;
/
