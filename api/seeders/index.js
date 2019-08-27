const bcrypt = require('bcrypt');

const productList = require('./products');
const userList = require('./users');

const Product = require('../models/product');
const User = require('../models/user');
const Cart = require('../models/cart');
const Review = require('../models/review');
//  const connection = require('../database/connection');

module.exports = async () => {
    try {
        await User.sync({force: true});
        await Product.sync({force: true});
        await Cart.sync({force: true});
        await Review.sync({force:  true});
        console.log('===== Adding Items =====');
        for (const product of productList) {
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
                console.log(`Added product: ${createdProduct.productName}`);
            } catch (err) {
                console.log(err);
            }
        };
        console.log('===== Adding Users =====');
        for (const user of userList) {
            try {
                const hashedPassword = await bcrypt.hash(user.userPassword, 10)
                const createdUser = await User.create({
                    userName: user.userName,
                    userEmail: user.userEmail,
                    userPassword: hashedPassword,
                });
                console.log (`Added user: ${createdUser.userName}`);
            } catch (err) {
                console.log(err);
            }
        };
    } catch (err) {
        console.log(err);
    }
}