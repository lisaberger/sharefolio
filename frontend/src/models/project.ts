import User from './user';

interface Project {}

class Project {
    id: string;
    creator: User;
    teaserImage: any;
    name: string;
    description: string;
    kind: string;
    tools: string;
    category: string;
    demo: string;
    image1: any;
    image2: any;
    contributors: string;

    constructor(
        id: string,
        creator: User,
        teaserImage: any,
        name: string,
        description: string,
        kind: string,
        tools: string,
        category: string,
        demo: string,
        image1: any,
        image2: any,
        contributors: string
    ) {
        this.id = id;
        this.creator = creator;
        this.teaserImage = teaserImage;
        this.name = name;
        this.description = description;
        this.kind = kind;
        this.tools = tools;
        this.category = category;
        this.demo = demo;
        this.image1 = image1;
        this.image2 = image2;
        this.contributors = contributors;
    }
}

export default Project;
