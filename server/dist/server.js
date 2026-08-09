import app from './app.js';
import sequelize from './db/db.js';
import { runMigrations } from './db/migrate.js';
import { env } from './config/env.js';
async function bootstrap() {
    await runMigrations();
    await sequelize.authenticate();
    console.log('Database connection has been established successfully.');
    app.listen(env.PORT, () => {
        console.log(`Backend connection listening to http://localhost:${env.PORT}`);
    });
}
bootstrap().catch((error) => {
    console.error('Failed to start backend:', error);
    process.exit(1);
});
//# sourceMappingURL=server.js.map