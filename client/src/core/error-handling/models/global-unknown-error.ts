export class GlobalUnknownError extends Error {
    constructor(message: string = 'An unknown error occurred.') {
        super(message);
        this.name = 'GlobalUnknownError';
    }
}
