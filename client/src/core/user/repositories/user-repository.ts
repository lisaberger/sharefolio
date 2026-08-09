import type { CreateRepository, ReadAllRepository, Result } from '@core/common';
import type {
    LocalConnectionError,
    LocalNotFoundError,
    LocalPermissionError,
    LocalValidationError,
} from '@core/error-handling';
import type { Project } from '@core/project';
import type { User } from '../models/user';
import type { UserCreatePayload } from '../types/user-create-payload';

export type UserRepositoryErrors =
    | LocalConnectionError
    | LocalPermissionError
    | LocalNotFoundError
    | LocalValidationError;

export type UserRepository = CreateRepository<
    UserCreatePayload,
    User,
    UserRepositoryErrors
> &
    ReadAllRepository<User, UserRepositoryErrors> & {
        getById(
            identifier: string
        ): Promise<Result<User, UserRepositoryErrors>>;
        getByName(
            username: string
        ): Promise<Result<User, UserRepositoryErrors>>;
        getProjectsByUsername(
            username: string
        ): Promise<Result<Project[], UserRepositoryErrors>>;
    };
