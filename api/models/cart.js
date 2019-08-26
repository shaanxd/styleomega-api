const Sequelize = require('sequelize');
const connection = require('../database/connection');
const User = require('./user');
const Product = require('./product');

class Cart extends Sequelize.Model {}

Cart.init({
    id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
    },
    totalPrice: {
        type: Sequelize.DOUBLE,
        allowNull: false,
    },
    itemQuantity: {
        type: Sequelize.INTEGER,
        allowNull: false,
    }
}, {
    sequelize: connection,
    modelName: 'cart'
});

Cart.belongsTo(User);
Cart.belongsTo(Product);

module.exports = Cart;