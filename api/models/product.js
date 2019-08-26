const Sequelize = require('sequelize');
const connection = require('../database/connection');

class Product extends Sequelize.Model {}

Product.init({
    id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
        get() {
            return this.getDataValue('id');
        }
    },
    productName:  {
        type: Sequelize.STRING,
        allowNull: false,
        get() {
            return this.getDataValue('productName');
        }
    },
    productDesc: {
        type: Sequelize.STRING,
        allowNull:  false,
        get() {
            return this.getDataValue('productDesc');
        }
    },
    scaledImg: {
        type: Sequelize.STRING,
        allowNull: false,
        get() {
            return this.getDataValue('scaledImg');
        }
    },
    availableStock: {
        type: Sequelize.INTEGER,
        allowNull: false,
        get() {
            return this.getDataValue('availableStock');
        }
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
        get() {
            return this.getDataValue('productImages').split('-');
        },
    },
}, {
    sequelize: connection,
    modelName: 'product'
});

module.exports = Product;