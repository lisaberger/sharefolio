export class LocalOperationalError extends Error {
    constructor(message: string = 'An operational error occurred.') {
        super(message);
        this.name = 'LocalOperationalError';
    }
}
