const Sequelize = require('sequelize');

const connection = new Sequelize("styleomega", "root", "warmachinerox", {
    host: "localhost",
    dialect: "mysql",
    pool: {
        max: 5,
        min: 0,
        aquire: 30000,
        idle: 10000,
    },
    logging: false,
});

module.exports = connection;