import { User } from '@core/user';
import { Project } from '@core/project';
import type { ProjectApiData, UserApiData } from './api-types';

export const toUser = (data: UserApiData): User =>
    new User({
        id: data.id ?? '',
        username: data.username ?? '',
        email: data.email ?? '',
        isAdmin: data.isAdmin ?? false,
        firstname: data.firstname,
        lastname: data.lastname,
        job: data.job,
        location: data.location,
        description: data.description,
        image: data.image ?? '',
    });

export const toProject = (data: ProjectApiData): Project =>
    new Project({
        id: data.id ?? '',
        creator: data.creator ? toUser(data.creator) : undefined,
        teaserImage: data.teaserImage,
        name: data.name ?? '',
        description: data.description,
        kind: data.kind ?? '',
        tools: data.tools,
        category:
            typeof data.category === 'string'
                ? data.category
                : data.category?.name,
        demo: data.demo,
        image1: data.image1,
        image2: data.image2,
        contributors: data.contributors,
    });
