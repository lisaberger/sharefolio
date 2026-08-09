import { User } from '@core/user';
import { Project } from '@core/project';
import { getApiBasePath } from '../../config/api.config';
import type { ProjectApiData, UserApiData } from './api-types';

/* the backend returns paths like "/public/projects/x.jpg"; the UI must load
   them from the API host, not its own origin. */
const toImageUrl = (path: string | undefined | null): string | undefined =>
    path ? `${getApiBasePath()}${path}` : undefined;

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
        image: toImageUrl(data.image) ?? '',
    });

export const toProject = (data: ProjectApiData): Project =>
    new Project({
        id: data.id ?? '',
        creator: data.creator ? toUser(data.creator) : undefined,
        teaserImage: toImageUrl(data.teaserImage),
        name: data.name ?? '',
        description: data.description,
        kind: data.kind ?? '',
        tools: data.tools,
        category:
            typeof data.category === 'string'
                ? data.category
                : data.category?.name,
        demo: data.demo,
        image1: toImageUrl(data.image1),
        image2: toImageUrl(data.image2),
        contributors: data.contributors,
    });
