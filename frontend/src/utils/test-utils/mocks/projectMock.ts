import type Project from '@/models/project';
import mockUser from './userMock';

const projectMock: Project = {
    id: '1',
    creator: mockUser,
    teaserImage: 'teaserImage.jpg',
    name: 'MockProject',
    description: 'Just a mock ...',
    kind: 'Webapplication',
    tools: 'Vue, Pinia, Node, Express',
    category: 'Web',
    demo: 'https://www.demo.de',
    image1: undefined,
    image2: undefined,
    contributors: 'Lisa',
};

export default projectMock;
