/*************************************************************************************
 * Projekt: Data
 *************************************************************************************/
BEGIN;

/* Data */
INSERT INTO
    project (
        "name",
        "ersteller_id",
        "beschreibung",
        "art",
        "tools",
        "mitwirkende",
        "kategorie_id",
        "titelbild",
        "bild1",
        "bild2",
        "demolink"
    )
VALUES
    (
        'elements',
        '67c65d60-31e9-4851-a86e-20f13fc53205',
        'elements ist eine 3D-Webapplikation zur Visualisierung der chemischen Elemente des Periodensystems. Für die Darstellung der Elemente haben wir die zweidimensionale Struktur der Periodentafel aufgebrochen und im dreidimensionalen Raum neue Wege gesucht wichtige Eigenschaften dazustellen. Die Anwendung besteht aus drei Hauptansichten: Startseite, Übersichtsseite und Detailansichtsseite. Entstanden ist das Projekt für den Kurs Interface Design im 3. Studiensemester',
        'Interactive 3D Webapplication',
        'HTML, CSS, Three.js',
        'Teresa Hauser, Lisa Berger, Marvin Murmann',
        '1',
        '/public/projects/elements_titel.jpg',
        '/public/projects/elements_bild1.jpg',
        '/public/projects/elements_bild2.jpg',
        ''
    ),
    (
        'Robot',
        'dc34f976-44ff-4c18-a4b5-e15a1b97427a',
        'In diesem Projekt ging es um die Konzeption und Erstellung eines kleinen Roboter-Charakters. Dabei wurde einmal der komplette Animationsworkflow durchlaufen. Beginnend mit Skizzen, Concept-Art, Modellierung, Rigging bis hin zur Animation selbst. Entstanden ist der Roboter im Rahmen des Kurses Grundlagen der dreidimensionalen Gestaltung.',
        '3D Charakter Design',
        'Autodesk Maya',
        'Lisa Berger',
        '1',
        '/public/projects/robot_titel.png',
        '/public/projects/robot_bild1.png',
        '/public/projects/robot_bild2.png',
        ''
    ),
    (
        'Lobster',
        'dc34f976-44ff-4c18-a4b5-e15a1b97427a',
        'Bei Lobster handelt es sich um einen einfachen Logoentwurf für ein Seafood Restaurant. Entstanden ist das Logo für den Kurs Grundlagen visueller Gestaltung im ersten Studiensemester. Von ersten Skizzen bis zum fertigen Logo wurde hier einmal der komplette Gestaltungsprozess angewandt. Zusätzlich sollte das Logo auch in Form von Mockups spannend präsentiert werden.',
        'Logo Design',
        'Autodesk Maya',
        'Lisa Berger',
        '1',
        '/public/projects/lobster_titel.jpg',
        '/public/projects/lobster_bild1.jpg',
        '/public/projects/lobster_bild2.gif',
        ''
    ),
    (
        'Visual Echo',
        'dc34f976-44ff-4c18-a4b5-e15a1b97427a',
        'Im Projekt Visual Echo ist ein Prototyp für ein Physical Interface in Form einer schwarzen Box entstanden. Über verschiedene Sensoren kann mit dieser interagiert werden und es kann eine Art "Farbecho" ausgelöst und gesteuert werden. Entstanden ist das Projekt für den Kurs Grundlagen interaktiver Gestaltung im zweiten Studiensemester.',
        'Physical Interface Box',
        'Arduino, p5.js, HTML, CSS, verschiedene Sensoren',
        'Lisa Berger',
        '1',
        '/public/projects/visualecho_titel.jpg',
        '/public/projects/visualecho_bild1.jpg',
        '/public/projects/visuelecho_bild2.png',
        'https://vimeo.com/565325165?embedded=true&source=video_title&owner=139870211'
    ),
    (
        'Happy Robot',
        '67c65d60-31e9-4851-a86e-20f13fc53205',
        'Bei diesem 3D-Projekt handelt es sich um ein Studienprojekt, welches im Rahmen des Kurses "Grundlagen dreidimensionaler Gestaltung" in meinem ersten Semester entstanden ist. Die Aufgabenstellung war, einen Roboter zu Modellieren, Riggen und Animieren.',
        '3D-Modelling und Animation',
        'Autodesk Maya',
        'Teresa Hauser',
        '1',
        '/public/projects/happyrobot_titel.png',
        '/public/projects/happyrobot_bild1.png',
        '/public/projects/happyrobot_bild2.png',
        ''
    ),
    (
        'Movin Augsburg',
        '67c65d60-31e9-4851-a86e-20f13fc53205',
        'Diese Projekt ist in Zusammenarbeit mit A3 Regio im Rahmen des Kurses "AUX-Film" entstanden. Dabei soll ein Imagefilm über Augsburg entstehen. Wir stellen in unserem Film Augsburg aus der Perspektive verschiedenner Menschen dar. Im Vordergrund stehen dabei die verschiedenen Fortbewegungsmittel.',
        'Filmproduktion',
        'GoPro Hero 8, Canon EOS 5D Mark IV, Premiere Pro, After Effects',
        'Teresa Hauser, Andrea Burgmann, Leonie Dieter, Erika Nguyen',
        '1',
        '/public/projects/movinaugsburg_titel.png',
        '/public/projects/movinaugsburg_bild1.png',
        '/public/projects/movinaugsburg_bild2.png',
        'https://youtu.be/9PP4Mu_EzIE'
    ),
    (
        'Prof Moustache erklärt Photosynthese',
        '67c65d60-31e9-4851-a86e-20f13fc53205',
        'Diese Projekt ist in Zusammenarbeit mit dem Waldpavillion und dem Kurs "Motion Graphics" entstanden. Dabei soll Photosynthese für Kinder erklärt werden. Es handelt sich dabei um einen Erklärfilm mit Narrator. Dieser wurde im Character Animator animiert, die restlichen Szenen sind in After Effects entstanden.',
        'Erklärfilm',
        'After Effects, Character Animator, Illustrator',
        'Teresa Hauser, Janice Rosenthal, Verena Leone, Lucas Jahn',
        '1',
        '/public/projects/photosynthese_titel.png',
        '/public/projects/photosynthese_bild1.jpg',
        '/public/projects/photosynthese_bild2.jpg',
        'https://youtu.be/mD5_bKiYH1Q'
    ),
    (
        'Space Crates',
        '67c65d60-31e9-4851-a86e-20f13fc53205',
        'Bei diesem 3D-Projekt handelt es sich um ein Studienprojekt, welches im Rahmen des Kurses "Grundlagen dreidimensionaler Gestaltung" in meinem ersten Semester entstanden ist. Die Aufgabenstellung war, drei Space Crates zu modellieren und anschließend in Photoshop zu einer Komposition zusammen zu fügen.',
        '3D Modelling',
        'Autodesk Maya, Adobe Photoshop',
        'Teresa Hauser',
        '1',
        '/public/projects/spacecrates_titel.png',
        '/public/projects/spacecrates_bild1.png',
        '/public/projects/spacecrates_bild2.png',
        ''
    ),
    (
        'ocean pollution',
        'dc34f976-44ff-4c18-a4b5-e15a1b97427a',
        'Schätzungen gehen davon aus, dass sich mittlerweile zwischen 100 und 142 Millionen Tonnen Müll in den Meeren befinden. Jährlich werden bis zu 10 Millionen weitere Tonnen eingetragen. Dreiviertel des Mülls im Meer besteht aus Kunststoffen, deren Abbau Jahrhunderte benötigt. Bei Ocean Pollution handelt es sich um ein experimentelles screen-basiertes Interface, das den Abbauzeitpunkt der häufigsten Treibgüter auf interaktive Weise veranschaulichen möchte. Das Projekt entstand in meinem zweiten Studiensemester für das Fach Interaktive Gestaltung.',
        'Webanwendung',
        'p5.js, HTML, CSS',
        'Lisa Berger',
        '1',
        '/public/projects/oceanpollution_titel.jpg',
        '/public/projects/oceanpollution_bild1.jpg',
        '/public/projects/oceanpollution_bild2.jpg',
        'https://www.hs-augsburg.de/homes/bergerli/oceanpollution/'
    ),
    (
        'auxactivity',
        '67c65d60-31e9-4851-a86e-20f13fc53205',
        'Bei auxactivity handelt es sich um eine Aktivitätensuche insbesondere für den Raum Augsburg. Grundsätzlich geht es darum, dass registrierte User beliebig viele Aktivitäten erstellen können. Diese Aktivitäten erscheinen in einer Übersicht, die alle eingeloggten User sehen und beliebig nach bestimmten Kategorien filtern können. Findet ein User eine für ihn interessante Aktivität, kann er sich mit Klick auf Details genauere Informationen zur Aktivität anzeigen lassen und ggf. dann auch daran "teilnehmen". Zusätzlich zu user-erstellten Aktivitäten befinden sich in der Datenbank auch von uns erstellte Verschläge für Aktivitäten in Augsburg. Auxactivity ist nicht als Übersicht für Veranstaltungen in Augsburg konzipiert, sondern eher als Aktivitätensuche im Freundeskreis gedacht.',
        'Webanwendung',
        'p5.js, HTML, CSS',
        'Teresa Hauser, Lisa Berger, Vanessa Mayr',
        '1',
        '/public/projects/auxactivity_titel.png',
        '/public/projects/auxactivity_bild1.png',
        '/public/projects/auxactivity_bild2.png',
        'https://www.hs-augsburg.de/homes/bergerli/oceanpollution/'
    )
    ;

/* Save it */
COMMIT;
