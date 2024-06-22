import { DataTypes } from 'sequelize';
import Account from './userModel.js';
import EnumCategory from './categoryModel.js';
import sequelize from '../db/db.js';

const Project = sequelize.define('Project', {
    id: {
        type: DataTypes.UUID,
        defaultValue: sequelize.literal('gen_random_uuid()'),
        primaryKey: true
    },
    ersteller_id: {
        type: DataTypes.UUID,
        allowNull: true,
        references: {
            model: 'account',
            key: 'id'
        }
    },
    titelbild: {
        type: DataTypes.STRING,
        defaultValue: '/public/projects/images_placeholder.jpg'
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    beschreibung: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    art: {
        type: DataTypes.STRING,
        allowNull: false
    },
    tools: {
        type: DataTypes.STRING,
        allowNull: true 
    },
    kategorie_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
            model: 'enum_category',
            key: 'id'
        }
    },
    demolink: {
        type: DataTypes.STRING,
        allowNull: true
    },
    bild1: {
        type: DataTypes.STRING,
        defaultValue: '/public/projects/images_placeholder.jpg'
    },
    bild2: {
        type: DataTypes.STRING,
        defaultValue: '/public/projects/images_placeholder.jpg'
    },
    mitwirkende: {
        type: DataTypes.STRING,
        allowNull: true
    }
}, {
    tableName: 'project',
    timestamps: false,
    underscored: true
});

Project.belongsTo(Account, { foreignKey: 'ersteller_id', as: 'creator' });
Project.belongsTo(EnumCategory, { foreignKey: 'kategorie_id', as: 'category' });

export default Project;
