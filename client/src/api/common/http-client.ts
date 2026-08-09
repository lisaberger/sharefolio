import axios, { type AxiosInstance } from 'axios';
import Cookies from 'node_modules/@types/js-cookie';
import { EnvironmentController } from '@core/common';

let client: AxiosInstance | undefined;

/**
 * Shared axios instance bound to the runtime API base path.
 * Attaches the session token from the cookie as a Bearer header.
 */
export const getHttpClient = (): AxiosInstance => {
    client ??= axios.create({
        baseURL: EnvironmentController.apiBasePath,
    });

    if ((client.interceptors.request.handlers ?? []).length === 0) {
        client.interceptors.request.use((config) => {
            const token = Cookies.get('sharefolio_token');

            if (token) {
                config.headers.Authorization = `Bearer ${token}`;
            }

            return config;
        });
    }

    return client;
};
