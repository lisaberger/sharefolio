export { LocalConnectionError } from './models/local-connection-error';
export { LocalPermissionError } from './models/local-permission-error';
export { LocalNotFoundError } from './models/local-not-found-error';
export { LocalValidationError } from './models/local-validation-error';
export { LocalOperationalError } from './models/local-operational-error';

export { GlobalAuthenticationError } from './models/global-authentication-error';
export { GlobalNotFoundError } from './models/global-not-found-error';
export { GlobalUnknownError } from './models/global-unknown-error';
export { GlobalAssertionError } from './models/global-assertion-error';

export type { LocalError, GlobalError } from './types/error';

export { isErrorHandledGlobally } from './utilities/is-error-handled-globally';
export { isErrorHandledLocally } from './utilities/is-error-handled-locally';
export { assertTruthy } from './utilities/assert-truthy';
