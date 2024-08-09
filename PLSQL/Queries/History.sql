/
-- generate_history
begin
    history_pkg.generate_history_csv(1);
    --history_pkg.get_history(1);
    --history_pkg.get_csv_content(1);
    --history_pkg.get_history_csv(1);
    dbms_output.put_line('Purchase history for user exported to CSV file.');
end;
/
-- get_history
declare
    p_user user_definition.user_id%TYPE := 1;
    p_pur history_pkg.l_history;
begin
    history_pkg.get_history(p_user_id => p_user, p_purchase_history => p_pur);
    
    for i IN 1..p_pur.COUNT loop
        dbms_output.put_line('User ID: ' || p_pur(i).user_id || ', ' ||
                             'Product ID: ' || p_pur(i).product_id || ', ' ||
                             'Product Name: ' || p_pur(i).product_name || ', ' ||
                             'Purchase Date: ' || TO_CHAR(p_pur(i).purchase_date, 'YYYY-MM-DD') || ', ' ||
                             'Quantity: ' || p_pur(i).quantity || ', ' ||
                             'Price: ' || p_pur(i).price || ', ' ||
                             'Total Amount: ' || p_pur(i).total_amount);
    end loop;
end;
/
select * from history;
/
