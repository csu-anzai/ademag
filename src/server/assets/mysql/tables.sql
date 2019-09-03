use malki;
DROP DATABASE malki;
CREATE DATABASE malki;
use malki;

DROP TABLE IF EXISTS `test`;
CREATE TABLE IF NOT EXISTS `test` (
  `id_test` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(255),
  `value` VARCHAR(255),
  PRIMARY KEY `pk_test`(`id_test`)
) ENGINE = InnoDB;

/*1) Table articles*/ /* --'_id, title, description, id_redacteur',*/
DROP TABLE IF EXISTS articles;
CREATE TABLE articles (
   _id VARCHAR(255) NOT NULL,
   id_redacteur INT(255) DEFAULT 0,
   title VARCHAR(255) NOT NULL,
   status TINYINT(1) DEFAULT 1,
   publication_date DATETIME DEFAULT CURRENT_TIMESTAMP,
   modification_date DATETIME ON UPDATE CURRENT_TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
   description TEXT,
   CONSTRAINT pk_articles PRIMARY KEY(_id)
)ENGINE = InnoDB;

/*2) Table contacts*/
DROP TABLE IF EXISTS contacts;
CREATE TABLE contacts (
   id INT(255) AUTO_INCREMENT NOT NULL,
   nom VARCHAR(255) NOT NULL,
   prenom VARCHAR(255),
   birthdate DATETIME,
   description VARCHAR(255),
   CONSTRAINT pk_contacts PRIMARY KEY(id)
)ENGINE = InnoDB;

/*3) Table redacteur*/
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

/*4) Table lecteurs*/ 
DROP TABLE IF EXISTS lecteurs;
CREATE TABLE lecteurs (
   id INT(255) AUTO_INCREMENT NOT NULL,
   id_contact INT(255) NOT NULL,
   username VARCHAR(255) NOT NULL UNIQUE,
   pass VARCHAR(255),
   email VARCHAR(255),
   CONSTRAINT pk_lecteurs PRIMARY KEY(id),
    CONSTRAINT contact_lecteur FOREIGN KEY(id_contact)
      REFERENCES contacts(id) ON DELETE CASCADE ON UPDATE CASCADE
)ENGINE = InnoDB;

/*5 View pour avoir la liste des contacts qui sont des redacteurs*/
DROP VIEW IF EXISTS users_redacteur;
CREATE VIEW users_redacteur AS
SELECT 
   redacteur.id AS id_user, contacts.id AS id_contact, redacteur.username, redacteur.pass, redacteur.email, 
   contacts.nom, contacts.prenom, contacts.birthdate, contacts.description 
FROM redacteur, contacts
WHERE redacteur.id_contact = contacts.id;

/*6 View pour avoir la liste des contacts qui sont des lecteurs*/
DROP VIEW IF EXISTS user_lecteur;
CREATE VIEW user_lecteur AS 
SELECT lecteurs.username,lecteurs.pass,lecteurs.email,lecteurs.id AS id_lecteur,contacts.nom,contacts.prenom,contacts.birthdate,contacts.description
FROM lecteurs,contacts
WHERE lecteurs.id_contact = contacts.id;






SELECT * FROM user_redacteur 
SELECT * FROM user_lecteur
SELECT * FROM contacts
select * from articles