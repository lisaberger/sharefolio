import { Model } from 'sequelize';
declare class Project extends Model {
    id: string;
    creator_id: string | null;
    teaserImage: string;
    name: string;
    description: string | null;
    kind: string;
    tools: string | null;
    category_id: number | null;
    demo: string | null;
    image1: string;
    image2: string;
    contributors: string | null;
}
export default Project;
