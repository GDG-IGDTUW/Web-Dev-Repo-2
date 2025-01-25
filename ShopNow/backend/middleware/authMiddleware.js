const authModel = require('../models/authModel.js')
const jwt = require('jsonwebtoken')

const checkAuthenticatedUser = async (req, res, next) => {
    let token;
    const {authorization} = req.headers;
        if (authorization && authorization.startsWith('Bearer')) {
            try{
                token = authorization.split(' ')[1];
                const{userId} = jwt.verify(token, process.env.JWT_SECRET);
                req.user = await authModel.findById(userId).select('--password');
                // console.log(req.user);
                next();
            }
            catch(error){
                res.status(401).json({message: 'Not authorized, token failed'})
            }
        }
        if (!token) {
            res.status(401).json({message: 'Not authorized, no token'})
        }

};

module.exports = checkAuthenticatedUser;