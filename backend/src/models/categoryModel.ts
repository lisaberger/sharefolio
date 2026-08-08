import { DataTypes, Model } from 'sequelize';
import sequelize from '../db/db.js';

class EnumCategory extends Model {
    declare id: number;
    declare name: string;
}

EnumCategory.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
    },
    {
        sequelize,
        modelName: 'EnumCategory',
        tableName: 'enum_category',
        timestamps: false,
        underscored: true,
    }
);

export default EnumCategory;
