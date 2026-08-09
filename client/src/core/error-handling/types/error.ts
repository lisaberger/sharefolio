export type LocalError =
    | LocalConnectionError
    | LocalPermissionError
    | LocalNotFoundError
    | LocalValidationError
    | LocalOperationalError;

export type GlobalError =
    | GlobalAuthenticationError
    | GlobalNotFoundError
    | GlobalUnknownError
    | GlobalAssertionError;

import type { LocalConnectionError } from '../models/local-connection-error';
import type { LocalPermissionError } from '../models/local-permission-error';
import type { LocalNotFoundError } from '../models/local-not-found-error';
import type { LocalValidationError } from '../models/local-validation-error';
import type { LocalOperationalError } from '../models/local-operational-error';
import type { GlobalAuthenticationError } from '../models/global-authentication-error';
import type { GlobalNotFoundError } from '../models/global-not-found-error';
import type { GlobalUnknownError } from '../models/global-unknown-error';
import type { GlobalAssertionError } from '../models/global-assertion-error';
