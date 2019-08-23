CREATE VIEW view_name AS
  SELECT columns
  FROM tables
  [WHERE conditions];

REPLACE VIEW view_name AS
  SELECT columns
  FROM tables
  [WHERE conditions];

  select * from articles where status = 0


  CREATE VIEW lecteurs AS
  SELECT columns
  FROM tables
  [WHERE conditions];

DROP VIEW IF EXISTS lecteurs;
CREATE VIEW lecteurs AS
SELECT users.id as id_user, pass, email, contacts.nom, contacts.prenom, contacts.description, contacts.birthdate
FROM users, contacts 
WHERE users.id_contact=contacts.id

select * from lecteurs