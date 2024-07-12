class User {
    id: string;
    lastname: string;
    username: string;
    email: string;
    isAdmin: boolean;
    firstname: string;
    job: string;
    location: string;
    description: string;
    image: any;

    constructor(
        id: string,
        lastname: string,
        firstname: string,
        username: string,
        email: string,
        isAdmin: boolean,
        job: string,
        location: string,
        description: string,
        image: any
    ) {
        this.id = id;
        this.lastname = lastname;
        this.username = username;
        this.email = email;
        this.isAdmin = isAdmin;
        this.firstname = firstname;
        this.job = job;
        this.location = location;
        this.description = description;
        this.image = image;
    }

    get fullname() {
        return `${this.firstname} ${this.lastname}`;
    }

    set fullname(name) {
        const nameParts = name.split(' ');
        this.firstname = nameParts[0];
        this.lastname = nameParts[1];
    }
}

export default User;
