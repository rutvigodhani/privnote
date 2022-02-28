CREATE DATABASE mySchema;
USE mySchema;
CREATE TABLE privnote (note varchar(255), destroyWhen varchar(255), pwd varchar(255), hashValue varchar(255), createdAt timestamp);
delimiter |
CREATE EVENT e_24hour
    ON SCHEDULE
      EVERY 1 MINUTE
    COMMENT 'clears table entry every 1 hour, 24 hour and 7 days'
    DO
      BEGIN
        DELETE FROM privnote WHERE TIMESTAMPDIFF(MINUTE,createdAt,NOW()) > 60 and destroyWhen = "1hour";
        DELETE FROM privnote WHERE TIMESTAMPDIFF(MINUTE,createdAt,NOW()) > 1440 and destroyWhen = "24hour";
        DELETE FROM privnote WHERE TIMESTAMPDIFF(MINUTE,createdAt,NOW()) > 10080 and destroyWhen = "7days";
      END |
delimiter ;
