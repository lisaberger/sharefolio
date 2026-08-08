import type { CreateRepository, ReadAllRepository, Result } from '@core/common';
import type {
    LocalConnectionError,
    LocalNotFoundError,
    LocalPermissionError,
    LocalValidationError,
} from '@core/error-handling';
import type { Category } from '../models/category';
import type { Project } from '../models/project';
import type { ProjectCreatePayload } from '../types/project-create-payload';

export type ProjectRepositoryErrors =
    | LocalConnectionError
    | LocalPermissionError
    | LocalNotFoundError
    | LocalValidationError;

export type ProjectRepository = CreateRepository<
    ProjectCreatePayload,
    Project,
    ProjectRepositoryErrors
> &
    ReadAllRepository<Project, ProjectRepositoryErrors> & {
        getByName(
            name: string
        ): Promise<Result<Project, ProjectRepositoryErrors>>;
        getCategories(): Promise<Result<Category[], ProjectRepositoryErrors>>;
    };
