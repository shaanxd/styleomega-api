const Sequelize = require('sequelize');
const connection = require('../database/connection');

class Product extends Sequelize.Model {}

Product.init({
    id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
    },
    productName:  {
        type: Sequelize.STRING,
        allowNull: false,
    },
    productDesc: {
        type: Sequelize.STRING,
        allowNull:  false,
    },
    scaledImg: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    availableStock: {
        type: Sequelize.INTEGER,
        allowNull: false,
    },
    actualPrice: {
        type: Sequelize.DOUBLE,
        allowNull: false,
    },
    productDiscount: {
        type: Sequelize.DOUBLE,
    },
    newArrival: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
    },
    productImages: {
        type: Sequelize.STRING(2000),
    },
}, {
    sequelize: connection,
    modelName: 'product'
});

module.exports = Product;