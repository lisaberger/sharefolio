import {
    isErrorResult,
    toDataResult,
    toErrorResult,
    type Result,
} from '@core/common';
import {
    GlobalAuthenticationError,
    LocalConnectionError,
    LocalPermissionError,
    LocalValidationError,
} from '@core/error-handling';
import {
    type AuthRepository,
    type AuthRepositoryErrors,
    type LoginCredentials,
} from '@core/auth';
import { User } from '@core/user';
import { getHttpClient } from '@api/common';
import { GlobalErrorMapper } from '@api/error-handling';
import { toUser } from '../../common/model-mappers';
import type { UserApiData } from '../../common/api-types';

export class ApiAuthRepository implements AuthRepository {
    constructor(protected _globalErrorMapper: GlobalErrorMapper) {}

    public static build(): ApiAuthRepository {
        return new ApiAuthRepository(GlobalErrorMapper.build());
    }

    public async login(
        credentials: LoginCredentials
    ): Promise<Result<User, AuthRepositoryErrors>> {
        try {
            const response = await getHttpClient().post<UserApiData>(
                '/auth/login',
                credentials
            );

            return toDataResult(toUser(response.data));
        } catch (error) {
            return this._toErrorResult(error);
        }
    }

    public async logout(): Promise<Result<void, AuthRepositoryErrors>> {
        try {
            await getHttpClient().get('/auth/logout');

            return toDataResult(undefined);
        } catch (error) {
            return this._toErrorResult(error);
        }
    }

    protected _toErrorResult(
        error: unknown
    ): Result<never, AuthRepositoryErrors> {
        const mapped = this._globalErrorMapper.toResult(error);

        if (!isErrorResult(mapped)) {
            return toErrorResult(
                new LocalConnectionError('An unknown error occurred.')
            );
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
