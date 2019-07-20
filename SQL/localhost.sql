---------           POUR AJOUTER DES DONNEES DANS LES TABLES  ---------

use KHZIJCA4G6;
DROP DATABASE KHZIJCA4G6;
CREATE DATABASE KHZIJCA4G6;
use KHZIJCA4G6;

SELECT * FROM photo

CREATE TABLE `photo` (
  `id_photo` int(255) NOT NULL,
  `nom` varchar(255) NOT NULL,
  `codage` varchar(255),
    `lien` varchar(255)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;


INSERT INTO `photo` (`id_photo`, `nom`, `codage`,`lien`) VALUES
(1, 'Chien', 'grand','lien'),
(2, 'Chat',  'petit','lien');