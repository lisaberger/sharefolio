export class User {
    constructor(
        id,
        name,
        username,
        email,
        isAdmin,
        vorname,
        jobtitel,
        ort,
        beschreibung,
        profilbild
    ) {
        this.id = id;
        this.name = name;
        this.username = username;
        this.email = email;
        this.isAdmin = isAdmin;
        this.vorname = vorname;
        this.jobtitel = jobtitel;
        this.ort = ort;
        this.beschreibung = beschreibung;
        this.profilbild = profilbild;
    }
}
