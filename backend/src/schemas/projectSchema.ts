import { z } from 'zod';

/* the frontend sends `projectData` as a JSON string inside the multipart body */
export const projectDataSchema = z
    .object({
        creatorId: z.string().optional(),
        headerPath: z.string().optional(),
        title: z.string().min(1, 'Title is required'),
        art: z.string().min(1, 'Kind is required'),
        tools: z.string().optional(),
        descr: z.string().optional(),
        category: z.coerce.number().int().optional().nullable(),
        link: z.string().optional(),
        collabs: z.string().optional(),
        pic1Path: z.string().optional(),
        pic2Path: z.string().optional(),
    })
    .strict();

export type ProjectData = z.infer<typeof projectDataSchema>;
