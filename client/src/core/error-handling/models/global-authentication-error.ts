export class GlobalAuthenticationError extends Error {
    constructor(message: string = 'Authentication failed.') {
        super(message);
        this.name = 'GlobalAuthenticationError';
    }
}
