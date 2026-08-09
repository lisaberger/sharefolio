import type { GlobalError } from '../types/error';

export const isErrorHandledGlobally = (error: Error): error is GlobalError =>
    error instanceof Error && error.name.startsWith('Global');
