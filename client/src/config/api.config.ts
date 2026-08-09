import { EnvironmentController } from '@core/common';

/**
 * Resolves the runtime API base path.
 */
export const getApiBasePath = (): string => EnvironmentController.apiBasePath;
