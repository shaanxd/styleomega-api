const Sequelize = require('sequelize');
const connection = require('../database/connection');

class User extends Sequelize.Model {}

User.init({
    id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
    },
    userName: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
    },
    userEmail: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
    },
    userPassword: {
        type: Sequelize.STRING,
        allowNull: false,
    }
}, {
    sequelize: connection,
    modelName: 'user'
});

module.exports = User;