begin
    -- Yeni kullanicilar ekliyorum
    user_pkg.register_user('user1', 'password1');
    user_pkg.register_user('user2', 'password2');
    user_pkg.register_user('user3', 'password3');
end;
/
declare
    login_result user_pkg.user_login_rec;
begin
    -- Kullanici giris
    login_result := user_pkg.login('user1', 'password1');
    if login_result.user_id is null then
        dbms_output.put_line('login failed');
    else
        dbms_output.put_line('login successful, user_id: ' || login_result.user_id || 
                             ', username: ' || login_result.username);
    end if;
end;
/
begin
    -- Kullanici sifresini degistir
    user_pkg.change_password(1, 'password1', 'password12');
    dbms_output.put_line('Password changed successfully');
exception
    when others then
        dbms_output.put_line('error changing password: ' || sqlerrm);
end;
/
begin
    -- Kullanici varligini kontrol
    user_pkg.exists_by_id(1);
    dbms_output.put_line('user exists');
end;
/
-- Kullanici tablosu
select * from user_definition;
/
