export type ProjectCreatePayload = {
    creatorId?: string;
    title: string;
    kind: string;
    tools?: string;
    description?: string;
    category?: string;
    demo?: string;
    contributors?: string;
    files?: File[];
};
