import type { DataResult, ErrorResult, Result } from '../types/result';

export const isDataResult = <D, E extends Error>(
    result: Result<D, E>
): result is DataResult<D> => result.error === undefined;

export const isErrorResult = <D, E extends Error>(
    result: Result<D, E>
): result is ErrorResult<E> => result.error !== undefined;

export const isErrorResultOneOf = <D, E extends Error, E2 extends Error>(
    result: Result<D, E>,
    errorTypes: Array<{ new (...args: never[]): Error }>
): Result<D, E | E2> =>
    isErrorResult(result) &&
    errorTypes.some((errorType) => result.error instanceof errorType)
        ? result
        : toDataResult(result.data as D);

export const toDataResult = <D>(data: D): DataResult<D> => ({ data });

export const toErrorResult = <E extends Error>(error: E): ErrorResult<E> => ({
    error,
});
