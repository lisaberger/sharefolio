import type { ProjectRepository } from '@core/project';
import { ApiProjectRepository } from '@api/project';

export const projectRepository: ProjectRepository =
    ApiProjectRepository.build();
