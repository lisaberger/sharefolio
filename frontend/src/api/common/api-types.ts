export type UserApiData = {
    id?: string;
    username?: string;
    email?: string;
    isAdmin?: boolean;
    firstname?: string;
    lastname?: string;
    job?: string;
    location?: string;
    description?: string;
    image?: string;
};

export type ProjectApiData = {
    id?: string;
    creator?: UserApiData;
    teaserImage?: string;
    name?: string;
    description?: string;
    kind?: string;
    tools?: string;
    category?: { name?: string } | string;
    demo?: string;
    image1?: string;
    image2?: string;
    contributors?: string;
};
