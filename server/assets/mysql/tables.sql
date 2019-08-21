/********************************************************
    tables
*********************************************************
*********************************************************/

use ademag;
DROP DATABASE ademag;
CREATE DATABASE ademag;
use ademag;

/*
DROP DATABASE FlufayKfhP;
CREATE DATABASE FlufayKfhP;
use FlufayKfhP;
*/

DROP TABLE IF EXISTS `test`;
CREATE TABLE IF NOT EXISTS `test` (
  `id_test` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(255),
  `value` VARCHAR(255),
  PRIMARY KEY `pk_test`(`id_test`)
) ENGINE = InnoDB;

/*table articles*/ 
DROP TABLE IF EXISTS articles;
CREATE TABLE articles (
   _id VARCHAR(255) NOT NULL,
   title VARCHAR(255) NOT NULL,
   status TINYINT(1) DEFAULT 1,
   publication_date DATETIME DEFAULT CURRENT_TIMESTAMP,
   modification_date DATETIME ON UPDATE CURRENT_TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
   description TEXT,
   CONSTRAINT pk_articles PRIMARY KEY(_id)
)ENGINE = InnoDB;

/*---Table contacts---*/
DROP TABLE IF EXISTS contacts;
CREATE TABLE contacts (
   id INT(255) AUTO_INCREMENT NOT NULL,
   nom VARCHAR(255) NOT NULL,
   prenom VARCHAR(255),
   birthdate DATETIME,
   description VARCHAR(255),
   CONSTRAINT pk_contacts PRIMARY KEY(id)
)ENGINE = InnoDB;

/*---Table redacteur---*/
DROP TABLE IF EXISTS redacteur;
CREATE TABLE redacteur (
   id INT(255) AUTO_INCREMENT NOT NULL,
   id_contact INT(255),
   username VARCHAR(255) NOT NULL UNIQUE,
   pass VARCHAR(255),
   email VARCHAR(255),
   CONSTRAINT pk_users PRIMARY KEY(id),
   CONSTRAINT fr_contacts FOREIGN KEY (id_contact)
     REFERENCES contacts(id) ON DELETE NO ACTION  ON UPDATE CASCADE
)ENGINE = InnoDB;

DROP VIEW IF EXISTS users_redacteur;
CREATE VIEW users_redacteur AS
SELECT 
   redacteur.id AS id_user, contacts.id AS id_contact, redacteur.username, redacteur.pass, redacteur.email, 
   contacts.nom, contacts.prenom, contacts.birthdate, contacts.description 
FROM redacteur, contacts
WHERE redacteur.id_contact = contacts.id

