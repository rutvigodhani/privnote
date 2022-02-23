use mySchema;

drop table temp;

create table temp (note varchar(255), destroyWhen varchar(255), pwd varchar(255), hashValue varchar(255), createdAt timestamp);

insert into temp(note, destroyWhen, pwd, hashValue, createdAt) values ("urll","yess","contentt","asd",NOW());

select * from temp;

select * from temp where hashValue = "asdasd";

delete from temp where hashValue="Qdk86lzTIki";

SHOW PROCESSLIST;

SELECT NOW();

select TIMESTAMPDIFF(MINUTE,NOW(),createdAt) from temp;

select * from temp where TIMESTAMPDIFF(MINUTE,createdAt,NOW()) > 60 and destroyWhen = "1hour";

CREATE EVENT e_24hour
    ON SCHEDULE
      EVERY 1 MINUTE
    COMMENT 'clears table entry every 1 hour, 6 hour and 24 hour'
    DO
      BEGIN
	    DELETE FROM temp WHERE TIMESTAMPDIFF(MINUTE,createdAt,NOW()) > 60 and destroyWhen = "1hour";
	    DELETE FROM temp WHERE TIMESTAMPDIFF(MINUTE,createdAt,NOW()) > 1440 and destroyWhen = "24hour";
	    DELETE FROM temp WHERE TIMESTAMPDIFF(MINUTE,createdAt,NOW()) > 10080 and destroyWhen = "7days";
      END

drop event e_24hour;

SHOW EVENTS;