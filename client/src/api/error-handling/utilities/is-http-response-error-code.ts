import { HttpResponseErrorCode } from '../enums/http-response-error-code';

export const isHttpResponseErrorCode = (
    code: string | undefined
): code is HttpResponseErrorCode =>
    code !== undefined &&
    Object.values(HttpResponseErrorCode).includes(
        code as HttpResponseErrorCode
    );
