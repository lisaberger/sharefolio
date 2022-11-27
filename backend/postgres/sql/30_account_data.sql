/*************************************************************************************
 * Account: Data
 *************************************************************************************/
BEGIN;

/* Data */
INSERT INTO
    account (
        "id",
        "name",
        "username",
        "email",
        "password",
        "isAdmin",
        "vorname",
        "jobtitel",
        "ort",
        "beschreibung",
        "profilbild"
    )
VALUES
    (
        '67c65d60-31e9-4851-a86e-20f13fc53205',
        'Hauser',
        'thauser',
        'teresa.hauser@hs-augsburg.de',
        'thauser',
        TRUE,
        'Teresa',
        'Interactive Media Student',
        'Augsburg',
        'Hallo, ich bin Teresa. Aktuell studiere ich Interaktive Medien B.A. an der Hochschule Augsburg.',
        'profile/avatar_placeholder.png'
    ),
    (
        '0c304664-bede-4d34-b10c-8ec27ac4e75a',
        'Murmann',
        'MaMu',
        'marv.murmann@gmx.net',
        'test1',
        TRUE,
        'Marvin',
        'Interactive Media Student',
        'Augsburg',
        'Sleep deprived',
        'profile/avatar_placeholder.png'
    ),
    (
        'dc34f976-44ff-4c18-a4b5-e15a1b97427a',
        'Berger',
        'lisab',
        'lisa.berger@hs-augsburg.de',
        'lisab',
        TRUE,
        'Lisa',
        'Interactive Media Student',
        'Augsburg',
        'Hallo, ich bin Lisa, gelernte Mediengestalterin für Digital und Print. Aktuell studiere ich Interaktive Medien B.Sc an der Hochschule Augsburg.',
        'profile/profilbild_lisa.jpg'
    )
    ;

/* Save it */
COMMIT;
