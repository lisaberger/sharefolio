export class User {
    public readonly id: string;
    public readonly username: string;
    public readonly email: string;
    public readonly isAdmin: boolean;
    public readonly firstname?: string;
    public readonly lastname?: string;
    public readonly job?: string;
    public readonly location?: string;
    public readonly description?: string;
    public readonly image: string;

    constructor(data: {
        id: string;
        username: string;
        email: string;
        isAdmin: boolean;
        firstname?: string;
        lastname?: string;
        job?: string;
        location?: string;
        description?: string;
        image: string;
    }) {
        this.id = data.id;
        this.username = data.username;
        this.email = data.email;
        this.isAdmin = data.isAdmin;
        this.firstname = data.firstname;
        this.lastname = data.lastname;
        this.job = data.job;
        this.location = data.location;
        this.description = data.description;
        this.image = data.image;
    }

    public get fullname(): string {
        return `${this.firstname ?? ''} ${this.lastname ?? ''}`.trim();
    }

    public get initials(): string {
        return `${(this.firstname ?? '').charAt(0)}${(this.lastname ?? '').charAt(0)}`.toUpperCase();
    }
}
