export type UserCreatePayload = {
    username: string;
    email: string;
    password: string;
    firstname?: string;
    lastname?: string;
    job?: string;
    location?: string;
    description?: string;
};
