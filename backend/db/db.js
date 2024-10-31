import { Sequelize } from 'sequelize';

const sequelize = new Sequelize('sharefolio', 'web', 'web', {
    host: 'sharefolio_postgres',
    dialect: 'postgres',
});

export default sequelize;