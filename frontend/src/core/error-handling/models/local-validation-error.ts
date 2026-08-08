export class LocalValidationError extends Error {
    constructor(message: string = 'The provided data is invalid.') {
        super(message);
        this.name = 'LocalValidationError';
    }
}
