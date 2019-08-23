const Sequelize = require('sequelize');

const {
    DB_USERNAME,
    DB_PASSWORD,
    DB_NAME,
    DB_HOST,
    DB_DIALECT,
} = process.env;

const connection = new Sequelize(DB_NAME, DB_USERNAME, DB_PASSWORD, {
    host: DB_HOST,
    dialect: DB_DIALECT,
    pool: {
        max: 5,
        min: 0,
        aquire: 30000,
        idle: 10000,
    },
    logging: false,
});

module.exports = connection;