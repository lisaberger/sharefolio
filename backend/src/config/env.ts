import { z } from 'zod';

const envSchema = z.object({
    PORT: z.coerce.number().default(4000),
    DB_HOST: z.string().default('postgres'),
    DB_PORT: z.coerce.number().default(5432),
    DB_NAME: z.string().default('sharefolio'),
    DB_USER: z.string().default('web'),
    DB_PASSWORD: z.string().default('web'),
    DB_LOG: z
        .enum(['true', 'false'])
        .default('false')
        .transform((v) => v === 'true'),
    SWAGGER_SERVER_URL: z.string().default('http://api.sharefolio.local'),
    SWAGGER_SERVER_DESCRIPTION: z.string().default('Sharefolio API'),
    UPLOAD_DIR: z.string().default('/app/public'),
});

const parsed = envSchema.safeParse(process.env);

if (!parsed.success) {
    console.error('Invalid environment configuration:', parsed.error.flatten());
    process.exit(1);
}

export const env = parsed.data;
