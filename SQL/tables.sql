/*table logs*/ 
DROP TABLE IF EXISTS logs;
CREATE TABLE logs (
   id_log INT(255) AUTO_INCREMENT NOT NULL,
   nom VARCHAR(255),
   CONSTRAINT pk_logs PRIMARY KEY(id_log)
)ENGINE = InnoDB;

INSERT INTO logs ( nom )
VALUES(
'nombre 2'
) 