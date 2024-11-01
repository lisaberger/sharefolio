import { DataTypes } from 'sequelize';
import sequelize from '../db/db.js';

const Account = sequelize.define('Account', {
    id: {
        type: DataTypes.UUID,
        defaultValue: sequelize.literal('gen_random_uuid()'),
        primaryKey: true
    },
    lastname: {
        type: DataTypes.STRING,
        allowNull: false
    },
    username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            notEmpty: true
        }
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            isEmail: true
        }
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    isAdmin: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
    },
    firstname: {
        type: DataTypes.STRING,
        allowNull: true
    },
    job: {
        type: DataTypes.STRING,
        allowNull: true
    },
    location: {
        type: DataTypes.STRING,
        allowNull: true
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    image: {
        type: DataTypes.STRING,
        defaultValue: '/public/profile/avatar_placeholder.png'
    }
}, {
    tableName: 'account',
    timestamps: false, 
    underscored: true,
    defaultScope: {
        attributes: { exclude: ['password'] }
    },
    hooks: {
        beforeCreate: (account) => {
            if (account.password) {
                account.password = encryptPassword(account.password);
            }
        },
        beforeUpdate: (account) => {
            if (account.changed('password')) {
                account.password = encryptPassword(account.password);
            }
        }
    }
});

const encryptPassword = (password) => {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(10));
};

export default Account;
