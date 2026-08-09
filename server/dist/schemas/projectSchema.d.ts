import { z } from 'zod';
export declare const projectDataSchema: z.ZodObject<{
    title: z.ZodString;
    art: z.ZodString;
    tools: z.ZodOptional<z.ZodString>;
    descr: z.ZodOptional<z.ZodString>;
    category: z.ZodNullable<z.ZodOptional<z.ZodNumber>>;
    link: z.ZodOptional<z.ZodString>;
    collabs: z.ZodOptional<z.ZodString>;
}, "strict", z.ZodTypeAny, {
    title: string;
    art: string;
    link?: string | undefined;
    tools?: string | undefined;
    category?: number | null | undefined;
    descr?: string | undefined;
    collabs?: string | undefined;
}, {
    title: string;
    art: string;
    link?: string | undefined;
    tools?: string | undefined;
    category?: number | null | undefined;
    descr?: string | undefined;
    collabs?: string | undefined;
}>;
export type ProjectData = z.infer<typeof projectDataSchema>;
