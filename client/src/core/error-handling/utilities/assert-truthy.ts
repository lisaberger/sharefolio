import { GlobalAssertionError } from '../models/global-assertion-error';

/**
 * Assert that a value is truthy, throwing a `GlobalAssertionError` otherwise.
 */
export const assertTruthy = (
    value: unknown,
    message: string
): asserts value => {
    if (!value) {
        throw new GlobalAssertionError(message);
    }
};
