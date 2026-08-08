import axios, { type AxiosInstance } from 'axios';
import { EnvironmentController } from '@core/common';

let client: AxiosInstance | undefined;

/**
 * Shared axios instance bound to the runtime API base path.
 */
export const getHttpClient = (): AxiosInstance => {
    client ??= axios.create({
        baseURL: EnvironmentController.apiBasePath,
    });

    return client;
};
