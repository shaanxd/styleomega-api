const productList = require('./products');
const Product = require('../models/product');
const User = require('../models/user');
const Cart = require('../models/cart');
//  const connection = require('../database/connection');

module.exports = async () => {
    try {
        await User.sync({force: true});
        await Product.sync({force: true});
        await Cart.sync({force: true});
        productList.forEach(async (product) => {
            const imageString = product.productImages.join('-');
            try {
                const createdProduct = await Product.create({
                    productName: product.productName,
                    productDesc: product.productDesc,
                    scaledImg: product.scaledImg,
                    availableStock: product.availableStock,
                    actualPrice: product.actualPrice,
                    productDiscount: product.productDiscount,
                    newArrival: product.newArrival,
                    productImages: imageString,
                });
                console.log(`Added: ${createdProduct.productName}`);
            } catch (err) {
                console.log(err);
            }
        });
    } catch (err) {
        console.log(err);
    }
}