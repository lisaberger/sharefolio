export class GlobalAssertionError extends Error {
    constructor(message: string = 'Assertion failed.') {
        super(message);
        this.name = 'GlobalAssertionError';
    }
}
