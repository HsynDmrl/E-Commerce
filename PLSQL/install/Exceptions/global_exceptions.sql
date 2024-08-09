CREATE OR REPLACE PACKAGE global_exceptions AS
    no_data_found EXCEPTION;
    invalid_input EXCEPTION;

    PROCEDURE raise_no_data_found(p_message VARCHAR2);
    PROCEDURE raise_invalid_input(p_message VARCHAR2);
END global_exceptions;
/

CREATE OR REPLACE PACKAGE BODY global_exceptions AS
    PROCEDURE raise_no_data_found(p_message VARCHAR2) IS
    BEGIN
        RAISE_APPLICATION_ERROR(-20001, 'No data found: ' || p_message);
    END raise_no_data_found;

    PROCEDURE raise_invalid_input(p_message VARCHAR2) IS
    BEGIN
        RAISE_APPLICATION_ERROR(-20002, 'Invalid input: ' || p_message);
    END raise_invalid_input;
END global_exceptions;
/
