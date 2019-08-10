/********************************************************
    tables
*********************************************************
    Andres Vicente Caballero Cantillo
    ADEMAG
*********************************************************/

use ademag;
DROP DATABASE ademag;
CREATE DATABASE ademag;
use ademag;


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
   id_article INT(255) AUTO_INCREMENT NOT NULL,
   _id VARCHAR(255) DEFAULT 'vide',
   title VARCHAR(255) NOT NULL,
   publication_date DATETIME DEFAULT CURRENT_TIMESTAMP,
   modification_date DATETIME ON UPDATE CURRENT_TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
   description TEXT,
   CONSTRAINT pk_articles PRIMARY KEY(id_article)
)ENGINE = InnoDB;

/*table events*/ 
DROP TABLE IF EXISTS events;
CREATE TABLE events (
   id_event INT(255) AUTO_INCREMENT NOT NULL,
   id_article INT(255) NOT NULL,
   publication_date DATETIME DEFAULT CURRENT_TIMESTAMP,
   event_date DATE NOT NULL,
   description TEXT,
   title VARCHAR(255),
   url_link VARCHAR(255),
   CONSTRAINT pk_eventos PRIMARY KEY(id_event),
   CONSTRAINT fk_articles FOREIGN KEY(id_article)
      REFERENCES articles(id_article) ON UPDATE CASCADE ON DELETE CASCADE    
)ENGINE = InnoDB;

/*table authors*/ 
DROP TABLE IF EXISTS authors;
CREATE TABLE authors (
   id_author INT(255) AUTO_INCREMENT NOT NULL,
   name VARCHAR(255),
   last_name VARCHAR(255),
   birth_date DATETIME,
   email VARCHAR(255),
   address VARCHAR(255),
   CONSTRAINT pk_authors PRIMARY KEY(id_author)
)ENGINE = InnoDB;

/*table articles_authors*/ 
DROP TABLE IF EXISTS articles_authors;
CREATE TABLE articles_authors (
   id_author INT(255) NOT NULL,
   id_article INT(255) NOT NULL,
   CONSTRAINT pk_articles_authors PRIMARY KEY(id_author, id_article),
   CONSTRAINT fk_articles2 FOREIGN KEY(id_article)
      REFERENCES articles(id_article) ON UPDATE CASCADE ON DELETE CASCADE, 
   CONSTRAINT fk_authors FOREIGN KEY(id_author)
      REFERENCES authors(id_author) ON UPDATE CASCADE ON DELETE CASCADE 
)ENGINE = InnoDB;

/*table documents*/ 
DROP TABLE IF EXISTS documents;
CREATE TABLE documents (
   id_document INT(255) AUTO_INCREMENT NOT NULL,
   id_article INT(255) NOT NULL,
   title VARCHAR(255),
   description VARCHAR(255),
   url_link VARCHAR(255),
   type VARCHAR(255),
   CONSTRAINT pk_documents PRIMARY KEY(id_document),
   CONSTRAINT fk_articles3 FOREIGN KEY(id_article)
      REFERENCES articles(id_article) ON UPDATE CASCADE ON DELETE CASCADE 
)ENGINE = InnoDB;

/*table subtitle*/ 
DROP TABLE IF EXISTS subtitle;
CREATE TABLE subtitle (
   id_subtitle INT(255) AUTO_INCREMENT NOT NULL,
   id_article INT(255) NOT NULL,
   subtitle_text VARCHAR(255),
   subtitle_order INT(255),
   CONSTRAINT pk_subtitle PRIMARY KEY(id_subtitle),
   CONSTRAINT fk_articles4 FOREIGN KEY(id_article)
      REFERENCES articles(id_article) ON UPDATE CASCADE ON DELETE CASCADE 
)ENGINE = InnoDB;

/*table paragraphs*/ 
DROP TABLE IF EXISTS paragraphs;
CREATE TABLE paragraphs (
   id_paragraph INT(255) AUTO_INCREMENT NOT NULL,
   id_subtitle INT(255) NOT NULL,
   paragraph_text TEXT,
   paragraph_order INT(255),
   CONSTRAINT pk_paragraphs PRIMARY KEY(id_paragraph),
   CONSTRAINT fk_subtitle FOREIGN KEY(id_subtitle)
      REFERENCES subtitle(id_subtitle) ON UPDATE CASCADE ON DELETE CASCADE 
)ENGINE = InnoDB;

/*table medias*/
DROP TABLE IF EXISTS medias;
CREATE TABLE medias (
   id_media INT(255) AUTO_INCREMENT NOT NULL,
   url_link VARCHAR(255),
   title VARCHAR(255),
   description VARCHAR(255),
   type VARCHAR(255),
   CONSTRAINT pk_medias PRIMARY KEY(id_media)
)ENGINE = InnoDB;

/*table media_paragraph*/ 
DROP TABLE IF EXISTS media_paragraph;
CREATE TABLE media_paragraph (
   id_paragraph INT(255) NOT NULL,
   id_media INT(255) NOT NULL,
   CONSTRAINT pk_media_paragraph PRIMARY KEY(id_paragraph, id_media),
   CONSTRAINT fk_paragraphs FOREIGN KEY(id_paragraph)
      REFERENCES paragraphs(id_paragraph) ON UPDATE CASCADE ON DELETE CASCADE, 
   CONSTRAINT fk_medias FOREIGN KEY(id_media)
      REFERENCES medias(id_media) ON UPDATE CASCADE ON DELETE CASCADE 
)ENGINE = InnoDB;

/*table gallery*/
DROP TABLE IF EXISTS gallery;
CREATE TABLE gallery (
   id_article INT(255) NOT NULL,
   id_media INT(255) NOT NULL,
   CONSTRAINT pk_gallery PRIMARY KEY(id_article, id_media),
   CONSTRAINT fk_articles5 FOREIGN KEY(id_article)
      REFERENCES articles(id_article) ON UPDATE CASCADE ON DELETE CASCADE, 
   CONSTRAINT fk_medias2 FOREIGN KEY(id_media)
      REFERENCES medias(id_media) ON UPDATE CASCADE ON DELETE CASCADE 
)ENGINE = InnoDB;