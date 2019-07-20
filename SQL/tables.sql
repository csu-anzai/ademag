/*table chuchinga*/ 
DROP TABLE IF EXISTS chuchinga;
CREATE TABLE chuchinga (
   id_usersdi INT(255) AUTO_INCREMENT NOT NULL,
   creation TIMESTAMP DEFAULT CURRENT_TIMESTAMP(),
   CONSTRAINT pk_chuchinga PRIMARY KEY(id_usersdi)
)ENGINE = InnoDB;
