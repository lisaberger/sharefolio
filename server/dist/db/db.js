import { Sequelize } from 'sequelize';
import { env } from '../config/env.js';
const sequelize = new Sequelize(env.DB_NAME, env.DB_USER, env.DB_PASSWORD, {
    host: env.DB_HOST,
    port: env.DB_PORT,
    dialect: 'postgres',
    logging: env.DB_LOG ? console.log : false,
});
export default sequelize;
//# sourceMappingURL=db.js.map