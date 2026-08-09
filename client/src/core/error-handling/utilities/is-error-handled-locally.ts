import type { LocalError } from '../types/error';

export const isErrorHandledLocally = (error: Error): error is LocalError =>
    error instanceof Error && error.name.startsWith('Local');
