export type ProjectCreatePayload = {
    creatorId?: string;
    title: string;
    kind: string;
    tools?: string;
    description?: string;
    category?: string;
    demo?: string;
    teaserPath?: string;
    image1Path?: string;
    image2Path?: string;
    contributors?: string;
    files?: File[];
};
