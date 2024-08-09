create or replace package hash_pkg as
  function hash_password(p_password in user_definition.password%type) return raw; -- Sifreyi hashleyen fonksiyon
end hash_pkg;
/
create or replace package body hash_pkg as
  function hash_password(p_password in user_definition.password%type) return raw is
  begin
    return dbms_crypto.hash(utl_i18n.string_to_raw(p_password, 'al32utf8'), dbms_crypto.hash_sh256);
  end hash_password;
end hash_pkg;
/
