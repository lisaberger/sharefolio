export class LocalConnectionError extends Error {
    constructor(message: string = 'Could not connect to the API.') {
        super(message);
        this.name = 'LocalConnectionError';
    }
}
