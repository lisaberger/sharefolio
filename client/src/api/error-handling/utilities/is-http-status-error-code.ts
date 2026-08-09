import { HttpStatusErrorCode } from '../enums/http-status-error-code';

export const isHttpStatusErrorCode = (
    status: number | undefined
): status is HttpStatusErrorCode =>
    status !== undefined &&
    Object.values(HttpStatusErrorCode).includes(status as HttpStatusErrorCode);
