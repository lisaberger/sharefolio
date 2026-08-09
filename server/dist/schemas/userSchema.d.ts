import { z } from 'zod';
export declare const userDataSchema: z.ZodObject<{
    lastname: z.ZodString;
    username: z.ZodString;
    email: z.ZodString;
    password: z.ZodString;
    firstname: z.ZodNullable<z.ZodOptional<z.ZodString>>;
    job: z.ZodNullable<z.ZodOptional<z.ZodString>>;
    location: z.ZodNullable<z.ZodOptional<z.ZodString>>;
    description: z.ZodNullable<z.ZodOptional<z.ZodString>>;
    image: z.ZodNullable<z.ZodOptional<z.ZodString>>;
}, "strict", z.ZodTypeAny, {
    email: string;
    lastname: string;
    username: string;
    password: string;
    firstname?: string | null | undefined;
    job?: string | null | undefined;
    location?: string | null | undefined;
    description?: string | null | undefined;
    image?: string | null | undefined;
}, {
    email: string;
    lastname: string;
    username: string;
    password: string;
    firstname?: string | null | undefined;
    job?: string | null | undefined;
    location?: string | null | undefined;
    description?: string | null | undefined;
    image?: string | null | undefined;
}>;
export declare const createUserBodySchema: z.ZodObject<{
    userData: z.ZodObject<{
        lastname: z.ZodString;
        username: z.ZodString;
        email: z.ZodString;
        password: z.ZodString;
        firstname: z.ZodNullable<z.ZodOptional<z.ZodString>>;
        job: z.ZodNullable<z.ZodOptional<z.ZodString>>;
        location: z.ZodNullable<z.ZodOptional<z.ZodString>>;
        description: z.ZodNullable<z.ZodOptional<z.ZodString>>;
        image: z.ZodNullable<z.ZodOptional<z.ZodString>>;
    }, "strict", z.ZodTypeAny, {
        email: string;
        lastname: string;
        username: string;
        password: string;
        firstname?: string | null | undefined;
        job?: string | null | undefined;
        location?: string | null | undefined;
        description?: string | null | undefined;
        image?: string | null | undefined;
    }, {
        email: string;
        lastname: string;
        username: string;
        password: string;
        firstname?: string | null | undefined;
        job?: string | null | undefined;
        location?: string | null | undefined;
        description?: string | null | undefined;
        image?: string | null | undefined;
    }>;
}, "strict", z.ZodTypeAny, {
    userData: {
        email: string;
        lastname: string;
        username: string;
        password: string;
        firstname?: string | null | undefined;
        job?: string | null | undefined;
        location?: string | null | undefined;
        description?: string | null | undefined;
        image?: string | null | undefined;
    };
}, {
    userData: {
        email: string;
        lastname: string;
        username: string;
        password: string;
        firstname?: string | null | undefined;
        job?: string | null | undefined;
        location?: string | null | undefined;
        description?: string | null | undefined;
        image?: string | null | undefined;
    };
}>;
export type UserData = z.infer<typeof userDataSchema>;
