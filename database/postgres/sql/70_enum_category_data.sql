/*************************************************************************************
 * Kategorien: Data
 *************************************************************************************/

BEGIN;

/* Data */

INSERT INTO enum_category("id", "name")
VALUES 
('1', 'Studienarbeit'),
('2', 'Freie Arbeit'),
('3', 'Auftragsarbeit');


/* Save it */
COMMIT;
