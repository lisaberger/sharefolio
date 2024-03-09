/*************************************************************************************
 * Project: Table
 *************************************************************************************/

 BEGIN;

 /* cleanup */
 DROP TABLE IF EXISTS project CASCADE;

 /* Tables */
CREATE TABLE project
("id"           UUID          DEFAULT gen_random_uuid(),
 "ersteller_id" UUID,
 "titelbild"    VARCHAR       DEFAULT '/public/projects/images_placeholder.jpg',
 "name"         D_UNTAINTED   NOT NULL,
 "beschreibung" TEXT,
 "art"          D_UNTAINTED   NOT NULL,
 "tools"        D_UNTAINTED,
 "kategorie_id" INT,
 "demolink"     VARCHAR,
 "bild1"        VARCHAR       DEFAULT '/public/projects/images_placeholder.jpg',
 "bild2"        VARCHAR       DEFAULT '/public/projects/images_placeholder.jpg',
 "mitwirkende"  D_UNTAINTED,

 CONSTRAINT project_pk
   PRIMARY KEY("id"),

 CONSTRAINT ersteller_fk
   FOREIGN KEY("ersteller_id") REFERENCES account("id"),

 CONSTRAINT cateogry_fk
   FOREIGN KEY ("kategorie_id") REFERENCES enum_category("id")
);

/* Save it */
COMMIT;
