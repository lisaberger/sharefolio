import type { Result } from '@core/common';
import type {
    LocalConnectionError,
    LocalPermissionError,
    LocalValidationError,
} from '@core/error-handling';
import type { User } from '@core/user';
import type { LoginCredentials } from '../types/login-credentials';

export type AuthRepositoryErrors =
    | LocalConnectionError
    | LocalPermissionError
    | LocalValidationError;

export type AuthRepository = {
    login(
        credentials: LoginCredentials
    ): Promise<Result<User, AuthRepositoryErrors>>;
    logout(): Promise<Result<void, AuthRepositoryErrors>>;
};
