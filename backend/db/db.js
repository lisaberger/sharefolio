import { Sequelize } from 'sequelize';

const sequelize = new Sequelize(
    process.env.DB_NAME ?? 'sharefolio',
    process.env.DB_USER ?? 'web',
    process.env.DB_PASSWORD ?? 'web',
    {
        host: process.env.DB_HOST ?? 'postgres',
        port: Number(process.env.DB_PORT ?? 5432),
        dialect: 'postgres',
        logging: process.env.DB_LOG === 'true' ? console.log : false,
    }
);

export default sequelize;
