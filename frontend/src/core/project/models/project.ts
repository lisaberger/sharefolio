import type { User } from '@core/user';

export class Project {
    public readonly id: string;
    public readonly creator?: User;
    public readonly teaserImage?: string;
    public readonly name: string;
    public readonly description?: string;
    public readonly kind: string;
    public readonly tools?: string;
    public readonly category?: string;
    public readonly demo?: string;
    public readonly image1?: string;
    public readonly image2?: string;
    public readonly contributors?: string;

    constructor(data: {
        id: string;
        name: string;
        kind: string;
        creator?: User;
        teaserImage?: string;
        description?: string;
        tools?: string;
        category?: string;
        demo?: string;
        image1?: string;
        image2?: string;
        contributors?: string;
    }) {
        this.id = data.id;
        this.creator = data.creator;
        this.teaserImage = data.teaserImage;
        this.name = data.name;
        this.description = data.description;
        this.kind = data.kind;
        this.tools = data.tools;
        this.category = data.category;
        this.demo = data.demo;
        this.image1 = data.image1;
        this.image2 = data.image2;
        this.contributors = data.contributors;
    }
}
