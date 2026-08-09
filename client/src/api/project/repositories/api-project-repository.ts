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
import {
    Category,
    Project,
    type ProjectCreatePayload,
    type ProjectRepository,
    type ProjectRepositoryErrors,
} from '@core/project';
import { getHttpClient } from '@api/common';
import { GlobalErrorMapper } from '@api/error-handling';
import { toProject } from '../../common/model-mappers';
import type { ProjectApiData } from '../../common/api-types';

type CategoryApiData = { id?: number; name?: string };

export class ApiProjectRepository implements ProjectRepository {
    constructor(protected _globalErrorMapper: GlobalErrorMapper) {}

    public static build(): ApiProjectRepository {
        return new ApiProjectRepository(GlobalErrorMapper.build());
    }

    public async readAll(): Promise<
        Result<Project[], ProjectRepositoryErrors>
    > {
        try {
            const response =
                await getHttpClient().get<ProjectApiData[]>('/projects');

            return toDataResult(response.data.map(toProject));
        } catch (error) {
            return this._toErrorResult(error);
        }
    }

    public async getByName(
        name: string
    ): Promise<Result<Project, ProjectRepositoryErrors>> {
        try {
            const response = await getHttpClient().get<ProjectApiData>(
                `/projects/${name}`
            );

            return toDataResult(toProject(response.data));
        } catch (error) {
            return this._toErrorResult(error);
        }
    }

    public async getCategories(): Promise<
        Result<Category[], ProjectRepositoryErrors>
    > {
        try {
            const response =
                await getHttpClient().get<CategoryApiData[]>('/categories');

            return toDataResult(
                response.data.map(
                    (category) =>
                        new Category({
                            id: category.id ?? 0,
                            name: category.name ?? '',
                        })
                )
            );
        } catch (error) {
            return this._toErrorResult(error);
        }
    }

    public async create(
        payload: ProjectCreatePayload
    ): Promise<Result<Project, ProjectRepositoryErrors>> {
        try {
            const formData = new FormData();

            payload.files?.forEach((file) =>
                formData.append('pics', file, file.name)
            );

            formData.append(
                'projectData',
                JSON.stringify({
                    title: payload.title,
                    art: payload.kind,
                    tools: payload.tools,
                    descr: payload.description,
                    category: payload.category,
                    link: payload.demo,
                    collabs: payload.contributors,
                })
            );

            await getHttpClient().post('/projects/create', formData);

            return toDataResult(
                new Project({
                    id: '',
                    name: payload.title,
                    kind: payload.kind,
                })
            );
        } catch (error) {
            return this._toErrorResult(error);
        }
    }

    protected _toErrorResult(
        error: unknown
    ): Result<never, ProjectRepositoryErrors> {
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
