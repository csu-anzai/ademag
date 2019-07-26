use ademag;
DROP DATABASE ademag;
CREATE DATABASE ademag;
use ademag;


INSERT INTO users(nombre,password,email) VALUES
('andres2','ajskh','asjklhd')
;


DROP TABLE IF EXISTS `users`;
CREATE TABLE IF NOT EXISTS `users` (
  `id_user` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `nombre` VARCHAR(255),
  `password` VARCHAR(255),
  `email` VARCHAR(255),
  PRIMARY KEY `pk_id_user`(`id_user`)
) ENGINE = InnoDB;


/*table articulos*/ 
DROP TABLE IF EXISTS articulos;
CREATE TABLE articulos (
   id_articulo INT(255) AUTO_INCREMENT NOT NULL,
   titulo VARCHAR(255) NOT NULL,
   fecha_publicacion DATETIME DEFAULT CURRENT_TIMESTAMP,
   fecha_modificacion DATETIME ON UPDATE CURRENT_TIMESTAMP,
   descripcion TEXT,
   CONSTRAINT pk_articulos PRIMARY KEY(id_articulo)
)ENGINE = InnoDB;

/*table eventos*/ 
DROP TABLE IF EXISTS eventos;
CREATE TABLE eventos (
   id_evento INT(255) AUTO_INCREMENT NOT NULL,
   id_articulo INT(255) NOT NULL,
   fecha_publicacion DATETIME DEFAULT CURRENT_TIMESTAMP,
   fecha_evento DATE NOT NULL,
   descripcion TEXT,
   titulo VARCHAR(255),
   hypervinculo VARCHAR(255),
   CONSTRAINT pk_eventos PRIMARY KEY(id_evento),
   CONSTRAINT fk_articulos FOREIGN KEY(id_articulo)
      REFERENCES articulos(id_articulo) ON UPDATE CASCADE ON DELETE CASCADE    
)ENGINE = InnoDB;

/*table autores*/ 
DROP TABLE IF EXISTS autores;
CREATE TABLE autores (
   id_autor INT(255) AUTO_INCREMENT NOT NULL,
   nombre VARCHAR(255),
   appellido VARCHAR(255),
   fecha_nacimiento DATETIME DEFAULT CURRENT_TIMESTAMP,
   email VARCHAR(255),
   direccion VARCHAR(255),
   CONSTRAINT pk_autores PRIMARY KEY(id_autor)
)ENGINE = InnoDB;

/*table articulos_autores*/ 
DROP TABLE IF EXISTS articulos_autores;
CREATE TABLE articulos_autores (
   id_autor INT(255) NOT NULL,
   id_articulo INT(255) NOT NULL,
   CONSTRAINT pk_articulos_autores PRIMARY KEY(id_autor, id_articulo),
   CONSTRAINT fk_articulos2 FOREIGN KEY(id_articulo)
      REFERENCES articulos(id_articulo) ON UPDATE CASCADE ON DELETE CASCADE, 
   CONSTRAINT fk_autores FOREIGN KEY(id_autor)
      REFERENCES autores(id_autor) ON UPDATE CASCADE ON DELETE CASCADE 
)ENGINE = InnoDB;

/*table documentos*/ 
DROP TABLE IF EXISTS documentos;
CREATE TABLE documentos (
   id_documento INT(255) AUTO_INCREMENT NOT NULL,
   id_articulo INT(255) NOT NULL,
   titulo VARCHAR(255),
   descripcion VARCHAR(255),
   hypervinculo VARCHAR(255),
   tipo VARCHAR(255),
   CONSTRAINT pk_documentos PRIMARY KEY(id_documento),
   CONSTRAINT fk_articulos3 FOREIGN KEY(id_articulo)
      REFERENCES articulos(id_articulo) ON UPDATE CASCADE ON DELETE CASCADE 
)ENGINE = InnoDB;

/*table subtitulos*/ 
DROP TABLE IF EXISTS subtitulos;
CREATE TABLE subtitulos (
   id_subtitulo INT(255) AUTO_INCREMENT NOT NULL,
   id_articulo INT(255) NOT NULL,
   subtitulo VARCHAR(255),
   orden INT(255),
   CONSTRAINT pk_subtitulos PRIMARY KEY(id_subtitulo),
   CONSTRAINT fk_articulos4 FOREIGN KEY(id_articulo)
      REFERENCES articulos(id_articulo) ON UPDATE CASCADE ON DELETE CASCADE 
)ENGINE = InnoDB;

/*table parrafos*/ 
DROP TABLE IF EXISTS parrafos;
CREATE TABLE parrafos (
   id_parrafo INT(255) AUTO_INCREMENT NOT NULL,
   id_subtitulo INT(255) NOT NULL,
   parrafo TEXT,
   orden INT(255),
   CONSTRAINT pk_parrafos PRIMARY KEY(id_parrafo),
   CONSTRAINT fk_subtitulos FOREIGN KEY(id_subtitulo)
      REFERENCES subtitulos(id_subtitulo) ON UPDATE CASCADE ON DELETE CASCADE 
)ENGINE = InnoDB;

/*table medias*/ 
DROP TABLE IF EXISTS medias;
CREATE TABLE medias (
   id_media INT(255) AUTO_INCREMENT NOT NULL,
   hypervinculo VARCHAR(255),
   titulo VARCHAR(255),
   descripcion VARCHAR(255),
   tipo VARCHAR(255),
   CONSTRAINT pk_medias PRIMARY KEY(id_media)
)ENGINE = InnoDB; 

/*table parrafos_medias*/ 
DROP TABLE IF EXISTS parrafos_medias;
CREATE TABLE parrafos_medias (
   id_parrafo INT(255) NOT NULL,
   id_media INT(255) NOT NULL,
   CONSTRAINT pk_parrafos_medias PRIMARY KEY(id_parrafo, id_media),
   CONSTRAINT fk_parrafos FOREIGN KEY(id_parrafo)
      REFERENCES parrafos(id_parrafo) ON UPDATE CASCADE ON DELETE CASCADE, 
   CONSTRAINT fk_medias FOREIGN KEY(id_media)
      REFERENCES medias(id_media) ON UPDATE CASCADE ON DELETE CASCADE 
)ENGINE = InnoDB; 

/*table articulos_medias*/ 
DROP TABLE IF EXISTS articulos_medias;
CREATE TABLE articulos_medias (
   id_articulo INT(255) NOT NULL,
   id_media INT(255) NOT NULL,
   CONSTRAINT pk_articulos_medias PRIMARY KEY(id_articulo, id_media),
   CONSTRAINT fk_articulos5 FOREIGN KEY(id_articulo)
      REFERENCES articulos(id_articulo) ON UPDATE CASCADE ON DELETE CASCADE, 
   CONSTRAINT fk_medias2 FOREIGN KEY(id_media)
      REFERENCES medias(id_media) ON UPDATE CASCADE ON DELETE CASCADE 
)ENGINE = InnoDB; 