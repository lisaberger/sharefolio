/*************************************************************************************
 * Kategorie: Table
 *************************************************************************************/

 BEGIN;

 /* cleanup */
 DROP TABLE IF EXISTS enum_category CASCADE;

 /* Tables */
CREATE TABLE enum_category
("id"       INTEGER,
 "name"     D_UNTAINTED,

 CONSTRAINT enum_category_pk
   PRIMARY KEY ("id"),

 CONSTRAINT enum_category_name_unique
   UNIQUE ("name")
);

/* Save it */

COMMIT;
