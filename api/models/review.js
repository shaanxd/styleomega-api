const Sequelize = require('sequelize');
const connection = require('../database/connection');
const User = require('./user');
const Product = require('./product');

class Review extends Sequelize.Model {}

Review.init({
    id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
    },
    title: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    comment: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    rating: {
        type: Sequelize.FLOAT,
        allowNull: false,
    },
}, {
    sequelize: connection,
    modelName: 'review'
});

Review.belongsTo(User);
Review.belongsTo(Product);

module.exports = Review;