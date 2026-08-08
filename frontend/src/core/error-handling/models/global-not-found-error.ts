export class GlobalNotFoundError extends Error {
    constructor(
        message: string = 'The requested resource could not be found.'
    ) {
        super(message);
        this.name = 'GlobalNotFoundError';
    }
}
