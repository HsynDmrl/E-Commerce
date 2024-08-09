declare
  v_user_id user_definition.user_id%type := 1;
begin
  -- Kullanici icin siparisi tamamla
  purchase_pkg.complete_purchase(p_user_id => v_user_id);
  dbms_output.put_line('Purchase completed successfully.');
exception
  when others then
    dbms_output.put_line('An error occurred: ' || sqlerrm);
end;
/
-- Siparis listesini getirme
declare
  v_order_list sys_refcursor;
  l_order      order_info_pkg.order_rec;
begin
  order_info_pkg.get_order_list(1, v_order_list);
  loop
    fetch v_order_list
      into l_order;
    exit when v_order_list%notfound;
    dbms_output.put_line('order id : ' || l_order.order_id || ', ' ||
                         'user id : ' || l_order.user_id || ', ' ||
                         'order date : ' || l_order.order_date || ', ' ||
                         'total amount : ' || l_order.total_amount || ', ' ||
                         'user name : ' || l_order.user_name);
  end loop;
  close v_order_list;
end;
/
-- Siparis detaylarini getirme
declare
    v_order_detail_list order_detail_pkg.l_order_detail;
begin
    order_detail_pkg.get_order_detail_list(1, v_order_detail_list);
    for i in 1..v_order_detail_list.count loop
        dbms_output.put_line('order detail id: ' || v_order_detail_list(i).order_detail_id);
        dbms_output.put_line('order id: ' || v_order_detail_list(i).order_id);
        dbms_output.put_line('product id: ' || v_order_detail_list(i).product_id);
        dbms_output.put_line('product name: ' || v_order_detail_list(i).product_name);
        dbms_output.put_line('quantity: ' || v_order_detail_list(i).quantity);
        dbms_output.put_line('-----------------------------------');
    end loop;
exception
    when others then
        dbms_output.put_line(sqlerrm);
end;
/
select * from order_detail;
/
select * from order_info;
/
