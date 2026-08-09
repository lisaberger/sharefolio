import axios from 'axios';
import type { AppEnvironment } from '../types/app-environment';

/**
 * Static config based on runtime environment.
 *
 * Resolves the API base path from `VITE_BACKEND_URL`, an injected
 * `app-config.json`, or a development fallback.
 */
export class EnvironmentController {
    private static _config?: EnvironmentController;

    public static readonly getBackendConfigPath = '/assets/app-config.json';
    public static readonly getDevelopmentBasePath = 'http://localhost:4000';

    protected constructor(
        protected _apiBasePath: string,
        protected _environment?: AppEnvironment
    ) {}

    public static get apiBasePath(): string {
        return this._config?._apiBasePath ?? this.getDevelopmentBasePath;
    }

    public static get environment(): AppEnvironment | undefined {
        return this._config?._environment;
    }

    public static create({
        basePath,
        environment,
    }: {
        basePath: string;
        environment: AppEnvironment;
    }): EnvironmentController {
        this._config ??= new EnvironmentController(basePath, environment);

        return this._config;
    }

    public static exist(): boolean {
        return !!this._config;
    }

    public static destroy(): void {
        this._config = undefined;
    }

    /**
     * Load the config injected by the deployment.
     */
    public static async loadConfigFromFile(): Promise<void> {
        try {
            const response = await axios.get(this.getBackendConfigPath);

            EnvironmentController.create({
                basePath:
                    response.data.BACKEND_URL ?? this.getDevelopmentBasePath,
                environment: {
                    demo: response.data.DEMO ?? false,
                },
            });
        } catch {
            EnvironmentController.create({
                basePath: this.getDevelopmentBasePath,
                environment: { demo: false },
            });
        }
    }

    /**
     * Initialize the config when not already present.
     */
    public static async init(): Promise<void> {
        if (EnvironmentController.exist()) {
            return;
        }

        const backendUrlFromEnv = import.meta.env['VITE_BACKEND_URL'];

        if (backendUrlFromEnv !== undefined && backendUrlFromEnv !== '') {
            EnvironmentController.create({
                basePath: backendUrlFromEnv,
                environment: { demo: false },
            });
        } else {
            await EnvironmentController.loadConfigFromFile();
        }
    }
}
