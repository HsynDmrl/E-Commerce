create or replace package history_br_pkg as
  procedure data_exists(p_count in integer); -- Veri var mi kontrol eden prosedur
  procedure clob_exists(p_clob in clob); -- CLOB veri var mi kontrol eden prosedur
end history_br_pkg;
/
create or replace package body history_br_pkg as
  procedure data_exists(p_count in integer) is
  begin
    if p_count = 0 then
      global_exceptions.raise_no_data_found('No data found.'); -- Veri yoksa hata firlat
    end if;
  end data_exists;

  procedure clob_exists(p_clob in clob) is
  begin
    if dbms_lob.getlength(p_clob) = 0 then
      global_exceptions.raise_no_data_found('No data found to export.'); -- CLOB veri yoksa hata firlat
    end if;
  end clob_exists;
end history_br_pkg;
/
