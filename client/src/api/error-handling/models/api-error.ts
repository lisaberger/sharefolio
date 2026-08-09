export class ApiError extends Error {
    public readonly statusCode?: number;
    public readonly code?: string;

    constructor(message: string, statusCode?: number, code?: string) {
        super(message);
        this.name = 'ApiError';
        this.statusCode = statusCode;
        this.code = code;
    }
}
