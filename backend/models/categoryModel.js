import { DataTypes } from 'sequelize';
import sequelize from '../db/db.js';

const EnumCategory = sequelize.define('EnumCategory', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    }
}, {
    tableName: 'enum_category',
    timestamps: false, 
    underscored: true
});

export default EnumCategory;