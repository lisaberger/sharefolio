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
    creator_id: {
        type: DataTypes.UUID,
        allowNull: true,
        references: {
            model: 'account',
            key: 'id'
        }
    },
    teaserImage: {
        type: DataTypes.STRING,
        defaultValue: '/public/projects/images_placeholder.jpg'
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    kind: {
        type: DataTypes.STRING,
        allowNull: false
    },
    tools: {
        type: DataTypes.STRING,
        allowNull: true 
    },
    category_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
            model: 'enum_category',
            key: 'id'
        }
    },
    demo: {
        type: DataTypes.STRING,
        allowNull: true
    },
    image1: {
        type: DataTypes.STRING,
        defaultValue: '/public/projects/images_placeholder.jpg'
    },
    image2: {
        type: DataTypes.STRING,
        defaultValue: '/public/projects/images_placeholder.jpg'
    },
    contributors: {
        type: DataTypes.STRING,
        allowNull: true
    }
}, {
    tableName: 'project',
    timestamps: false,
    underscored: true
});

Project.belongsTo(Account, { foreignKey: 'creator_id', as: 'creator' });
Project.belongsTo(EnumCategory, { foreignKey: 'category_id', as: 'category' });

export default Project;
