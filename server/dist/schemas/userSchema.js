import { z } from 'zod';
export const userDataSchema = z
    .object({
    lastname: z.string().min(1, 'Lastname is required'),
    username: z.string().min(1, 'Username is required'),
    email: z.string().email('Valid email is required'),
    password: z.string().min(1, 'Password is required'),
    firstname: z.string().optional().nullable(),
    job: z.string().optional().nullable(),
    location: z.string().optional().nullable(),
    description: z.string().optional().nullable(),
    image: z.string().optional().nullable(),
})
    .strict();
export const createUserBodySchema = z
    .object({
    userData: userDataSchema,
})
    .strict();
//# sourceMappingURL=userSchema.js.map