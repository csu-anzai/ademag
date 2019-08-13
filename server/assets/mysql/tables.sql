/********************************************************
    tables
*********************************************************
*********************************************************/

use ;
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
   _id VARCHAR(255) NOT NULL,
   title VARCHAR(255) NOT NULL,
   publication_date DATETIME DEFAULT CURRENT_TIMESTAMP,
   modification_date DATETIME ON UPDATE CURRENT_TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
   description TEXT,
   CONSTRAINT pk_articles PRIMARY KEY(_id)
)ENGINE = InnoDB;