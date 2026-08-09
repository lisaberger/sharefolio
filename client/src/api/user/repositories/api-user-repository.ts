import {
    isErrorResult,
    toDataResult,
    toErrorResult,
    type Result,
} from '@core/common';
import {
    GlobalAuthenticationError,
    GlobalNotFoundError,
    LocalConnectionError,
    LocalNotFoundError,
    LocalPermissionError,
    LocalValidationError,
} from '@core/error-handling';
import type {
    User,
    UserCreatePayload,
    UserRepository,
    UserRepositoryErrors,
} from '@core/user';
import { Project } from '@core/project';
import { getHttpClient } from '@api/common';
import { GlobalErrorMapper } from '@api/error-handling';
import { toProject, toUser } from '../../common/model-mappers';
import type { ProjectApiData, UserApiData } from '../../common/api-types';

export class ApiUserRepository implements UserRepository {
    constructor(protected _globalErrorMapper: GlobalErrorMapper) {}

    public static build(): ApiUserRepository {
        return new ApiUserRepository(GlobalErrorMapper.build());
    }

    public async readAll(): Promise<Result<User[], UserRepositoryErrors>> {
        try {
            const response = await getHttpClient().get<UserApiData[]>('/users');

            return toDataResult(response.data.map(toUser));
        } catch (error) {
            return this._toErrorResult(error);
        }
    }

    public async getById(
        identifier: string
    ): Promise<Result<User, UserRepositoryErrors>> {
        try {
            const response = await getHttpClient().get<UserApiData>(
                `/users/${identifier}`
            );

            return toDataResult(toUser(response.data));
        } catch (error) {
            return this._toErrorResult(error);
        }
    }

    public async getByName(
        username: string
    ): Promise<Result<User, UserRepositoryErrors>> {
        try {
            const response = await getHttpClient().get<UserApiData>(
                `/users/${username}`
            );

            return toDataResult(toUser(response.data));
        } catch (error) {
            return this._toErrorResult(error);
        }
    }

    public async getProjectsByUsername(
        username: string
    ): Promise<Result<Project[], UserRepositoryErrors>> {
        try {
            const response = await getHttpClient().get<ProjectApiData[]>(
                `/users/${username}/projects`
            );

            return toDataResult(response.data.map(toProject));
        } catch (error) {
            return this._toErrorResult(error);
        }
    }

    public async create(
        payload: UserCreatePayload
    ): Promise<Result<User, UserRepositoryErrors>> {
        try {
            await getHttpClient().post('/users/create', { userData: payload });

            return toDataResult(
                toUser({
                    id: '',
                    username: payload.username,
                    email: payload.email,
                    isAdmin: false,
                    firstname: payload.firstname,
                    lastname: payload.lastname,
                    job: payload.job,
                    location: payload.location,
                    description: payload.description,
                })
            );
        } catch (error) {
            return this._toErrorResult(error);
        }
    }

    protected _toErrorResult(
        error: unknown
    ): Result<never, UserRepositoryErrors> {
        const mapped = this._globalErrorMapper.toResult(error);

        if (!isErrorResult(mapped)) {
            return toErrorResult(
                new LocalConnectionError('An unknown error occurred.')
            );
        }

        if (mapped.error instanceof GlobalNotFoundError) {
            return toErrorResult(new LocalNotFoundError(mapped.error.message));
        }

        if (mapped.error instanceof GlobalAuthenticationError) {
            return toErrorResult(
                new LocalPermissionError(mapped.error.message)
            );
        }

        if (mapped.error.message.toLowerCase().includes('validate')) {
            return toErrorResult(
                new LocalValidationError(mapped.error.message)
            );
        }

        return toErrorResult(new LocalConnectionError(mapped.error.message));
    }
}
