import { z } from 'zod';
/* the frontend sends `projectData` as a JSON string inside the multipart body.
   the creator is derived from the authenticated session, not from the client. */
export const projectDataSchema = z
    .object({
    title: z.string().min(1, 'Title is required'),
    art: z.string().min(1, 'Kind is required'),
    tools: z.string().optional(),
    descr: z.string().optional(),
    category: z.coerce.number().int().optional().nullable(),
    link: z.string().optional(),
    collabs: z.string().optional(),
})
    .strict();
//# sourceMappingURL=projectSchema.js.map