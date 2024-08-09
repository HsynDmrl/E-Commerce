create or replace package user_val_pkg as
  procedure validate_username(p_username in user_definition.username%type); -- Kullanici adini dogrulamak icin prosedur
  procedure validate_password(p_password in user_definition.password%type); -- Sifreyi dogrulamak icin prosedur
end user_val_pkg;
/
create or replace package body user_val_pkg as
  procedure validate_username(p_username in user_definition.username%type) is
  begin
    -- Kullanici adinin gecerliligini kontrol ediyorum
    if p_username is null or length(p_username) < 5 or length(p_username) > 50 then
      global_exceptions.raise_invalid_input('Username must be between 5 and 50 characters and cannot be NULL');
    end if;
  end validate_username;

  procedure validate_password(p_password in user_definition.password%type) is
  begin
    -- Sifrenin gecerliligini kontrol ediyorum
    if p_password is null or length(p_password) < 8 or length(p_password) > 64 then
      global_exceptions.raise_invalid_input('Password must be at least 8 and 64 characters and cannot be NULL');
    end if;
  end validate_password;
end user_val_pkg;
/
