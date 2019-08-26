const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    try {
        const {headers: {authorization}} = req;
        const {env: {JWT_KEY}} = process;
        const userToken = authorization.split(' ')[1];
        const decoded = jwt.verify(userToken, JWT_KEY);
        req.userData = decoded;
        next();
    } catch (err) {
        return res.status(401).json({
            message: 'Authorization failed.',
        });
    }
}