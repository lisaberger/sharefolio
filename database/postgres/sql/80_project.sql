/*************************************************************************************
 * Project: Table
 *************************************************************************************/

 BEGIN;

 /* cleanup */
 DROP TABLE IF EXISTS project CASCADE;

 /* Tables */
CREATE TABLE project
("id"           UUID          DEFAULT gen_random_uuid(),
 "creator_id"   UUID,
 "teaser_image"  VARCHAR       DEFAULT '/public/projects/images_placeholder.jpg',
 "name"         D_UNTAINTED   NOT NULL,
 "description"  TEXT,
 "kind"         D_UNTAINTED   NOT NULL,
 "tools"        D_UNTAINTED,
 "category_id"  INT,
 "demo"         VARCHAR,
 "image1"       VARCHAR       DEFAULT '/public/projects/images_placeholder.jpg',
 "image2"       VARCHAR       DEFAULT '/public/projects/images_placeholder.jpg',
 "contributors" D_UNTAINTED,

 CONSTRAINT project_pk
   PRIMARY KEY("id"),

 CONSTRAINT ersteller_fk
   FOREIGN KEY("creator_id") REFERENCES account("id"),

 CONSTRAINT cateogry_fk
   FOREIGN KEY ("category_id") REFERENCES enum_category("id")
);

/* Save it */
COMMIT;
