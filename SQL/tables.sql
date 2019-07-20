use KHZIJCA4G6;
DROP DATABASE KHZIJCA4G6;
CREATE DATABASE KHZIJCA4G6;
use KHZIJCA4G6;

DROP TABLE IF EXISTS users;
CREATE TABLE users (
    id_user INT(255) AUTO_INCREMENT NOT NULL,
    nom VARCHAR(255) NOT NULL UNIQUE,
    prenom VARCHAR(255) NOT NULL,
    motdepasse VARCHAR(255) NOT NULL,
    email VARCHAR(255),
    CONSTRAINT pk_users PRIMARY KEY(id_user)
)ENGINE = InnoDB;


DROP TABLE IF EXISTS log;
CREATE TABLE log (
   id_user INT(255) NOT NULL,
   action VARCHAR(255) NOT NULL,
   value VARCHAR(255),
   time_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
   CONSTRAINT pk_log PRIMARY KEY(id_user,time_date),
   CONSTRAINT loginU FOREIGN KEY(id_user)
        REFERENCES users(id_user) ON UPDATE CASCADE ON DELETE CASCADE
)ENGINE = InnoDB;

DROP TABLE IF EXISTS redacteur;
CREATE TABLE redacteur (
    id_user INT(255) NOT NULL,
    CONSTRAINT pk_redacteur PRIMARY KEY(id_user),
    CONSTRAINT est_redacteur FOREIGN KEY(id_user)
    REFERENCES users(id_user) ON UPDATE CASCADE ON DELETE CASCADE
)ENGINE = InnoDB;


DROP TABLE IF EXISTS lecteur;
CREATE TABLE lecteur (
    id_user INT(255) NOT NULL,
    CONSTRAINT pk_lecteur PRIMARY KEY(id_user),
    CONSTRAINT est_lecteur FOREIGN KEY(id_user)
    REFERENCES users(id_user) ON UPDATE CASCADE ON DELETE CASCADE
)ENGINE = InnoDB;

DROP TABLE IF EXISTS projLect;
CREATE TABLE projLect (
    id_projLect INT(255) AUTO_INCREMENT NOT NULL,
    description_proj VARCHAR(255) NOT NULL UNIQUE,
    lien VARCHAR(255) NOT NULL,
    CONSTRAINT pk_projLect PRIMARY KEY(id_projLect)
)ENGINE = InnoDB;


DROP TABLE IF EXISTS publication;
CREATE TABLE publication (
    id_publication INT(255) AUTO_INCREMENT NOT NULL,
    nom_publication VARCHAR(255) NOT NULL UNIQUE,
    date_publication VARCHAR(255) NOT NULL,
    CONSTRAINT pk_publication PRIMARY KEY(id_publication)
)ENGINE = InnoDB;


DROP TABLE IF EXISTS evaluation;
CREATE TABLE evaluation ( 
   id_evaluation INT(255) AUTO_INCREMENT NOT NULL,
   commentaire VARCHAR(255) NOT NULL,
   note INT NOT NULL,
   CONSTRAINT pk_evaluation PRIMARY KEY(id_evaluation)
)ENGINE = InnoDB;

DROP TABLE IF EXISTS auteur;
CREATE TABLE auteur ( 
   id_auteur  INT(255) AUTO_INCREMENT  NOT NULL,
   nom VARCHAR(255) NOT NULL,
   prenom VARCHAR(255) NOT NULL,
   CONSTRAINT pk_auteur PRIMARY KEY(id_auteur)
)ENGINE = InnoDB;

DROP TABLE IF EXISTS photo;
CREATE TABLE photo ( 
   id_photo INT(255) AUTO_INCREMENT  NOT NULL,
   nom VARCHAR(255),
   codage VARCHAR(255),
   lien VARCHAR(255),
   CONSTRAINT pk_photo PRIMARY KEY(id_photo)
)ENGINE = InnoDB;

DROP TABLE IF EXISTS photo_publication;
CREATE TABLE photo_publication ( 
   id_photo INT(255) NOT NULL,
   id_publication INT(255) NOT NULL,
   CONSTRAINT pk_photo PRIMARY KEY(id_photo, id_publication),
   CONSTRAINT fk_publication FOREIGN KEY(id_publication)
      REFERENCES publication(id_publication) ON UPDATE CASCADE ON DELETE CASCADE 
)ENGINE = InnoDB;



DROP TABLE IF EXISTS video;
CREATE TABLE video ( 
   id_video INT(255) AUTO_INCREMENT  NOT NULL,
   nom VARCHAR(255),
   codage VARCHAR(255),
   lien VARCHAR(255),
   CONSTRAINT pk_video PRIMARY KEY(id_video)
)ENGINE = InnoDB;

DROP TABLE IF EXISTS video_publication;
CREATE TABLE video_publication ( 
   id_video INT(255) NOT NULL,
   id_publication INT(255) NOT NULL,
   CONSTRAINT pk_video PRIMARY KEY(id_video, id_publication),
   CONSTRAINT fk2_publication FOREIGN KEY(id_publication)
      REFERENCES publication(id_publication) ON UPDATE CASCADE ON DELETE CASCADE 
)ENGINE = InnoDB;

DROP TABLE IF EXISTS contenu;
CREATE TABLE contenu ( 
   id_contenu INT(255) NOT NULL AUTO_INCREMENT,
   titre VARCHAR(255) NOT NULL,
   CONSTRAINT pk_contenu PRIMARY KEY(id_contenu)
)ENGINE = InnoDB;

DROP TABLE IF EXISTS paragraphe;
CREATE TABLE paragraphe ( 
   id_paragraphe INT(255) NOT NULL AUTO_INCREMENT,
   id_contenu INT(255) NOT NULL,
   num_ordre INT(255) NOT NULL,
   contenu_paragraphe VARCHAR(255) NOT NULL,
   CONSTRAINT pk_paragraphe PRIMARY KEY(id_paragraphe),
   CONSTRAINT fk_contenu FOREIGN KEY(id_contenu)
      REFERENCES contenu(id_contenu) ON UPDATE CASCADE ON DELETE CASCADE
)ENGINE = InnoDB;


----------------------    ERREURS   -----------------------------------

DROP TABLE IF EXISTS publication;
CREATE TABLE publication (
    id_publication INT(255) AUTO_INCREMENT NOT NULL,
    nom_publication VARCHAR(255) NOT NULL UNIQUE,
    date_publication VARCHAR(255) NOT NULL,
    CONSTRAINT pk_publication PRIMARY KEY(id_publication),
    CONSTRAINT fk_users FOREIGN KEY(id_user)
      REFERENCES users(id_user) ON UPDATE CASCADE ON DELETE CASCADE 
)ENGINE = InnoDB;

-- Arrive pas à faire la référence avec le rédacteur de la publication
--ER_KEY_COLUMN_DOES_NOT_EXITS: Key column 'id_user' doesn't exist in table


DROP TABLE IF EXISTS evaluation;
CREATE TABLE evaluation ( 
   id_evaluation INT(255) AUTO_INCREMENT NOT NULL,
   commentaire VARCHAR(255) NOT NULL,
   note INT NOT NULL,
   CONSTRAINT pk_evaluation PRIMARY KEY(id_evaluation),
  -- CONSTRAINT fk_publication FOREIGN KEY(id_publication)
)ENGINE = InnoDB;


DROP TABLE IF EXISTS auteur;
CREATE TABLE auteur ( 
   id_auteur  INT(255) AUTO_INCREMENT  NOT NULL,
   nom VARCHAR(255) NOT NULL,
   prenom VARCHAR(255) NOT NULL,
   CONSTRAINT pk_auteur PRIMARY KEY(id_auteur),
  -- CONSTRAINT fk_publication FOREIGN KEY(id_publication)
)ENGINE = InnoDB;