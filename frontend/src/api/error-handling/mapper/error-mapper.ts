import axios from 'axios';
import { toErrorResult, type Result } from '@core/common';
import {
    GlobalAuthenticationError,
    GlobalNotFoundError,
    GlobalUnknownError,
} from '@core/error-handling';
import { HttpStatusErrorCode } from '../enums/http-status-error-code';

export type MappedGlobalError =
    | GlobalAuthenticationError
    | GlobalNotFoundError
    | GlobalUnknownError;

/**
 * Maps errors coming from the backend (or the network layer) to typed
 * `Global*` errors.
 */
export class GlobalErrorMapper {
    private static _instance?: GlobalErrorMapper;

    public static build(): GlobalErrorMapper {
        this._instance ??= new GlobalErrorMapper();

        return this._instance;
    }

    public toResult(error: unknown): Result<never, MappedGlobalError> {
        if (axios.isAxiosError(error)) {
            const status = error.response?.status;
            const message = error.response?.data?.error;

            if (
                status === HttpStatusErrorCode.Unauthorized ||
                status === HttpStatusErrorCode.Forbidden
            ) {
                return toErrorResult(
                    new GlobalAuthenticationError(
                        message ?? 'Authentication failed.'
                    )
                );
            }

            if (status === HttpStatusErrorCode.NotFound) {
                return toErrorResult(
                    new GlobalNotFoundError(
                        message ?? 'The requested resource could not be found.'
                    )
                );
            }

            return toErrorResult(
                new GlobalUnknownError(
                    message ?? error.message ?? 'An unknown error occurred.'
                )
            );
        }

        return toErrorResult(
            new GlobalUnknownError(
                error instanceof Error
                    ? error.message
                    : 'An unknown error occurred.'
            )
        );
    }
}
