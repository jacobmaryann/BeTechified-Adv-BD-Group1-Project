const jwt = require('jsonwebtoken');

const Accesstoken = (user) => {
    return jwt.sign({
        userId: user._id,
        name: user.name,
        email: user.email
    }, process.env.JWT_SECRET, { expiresIn: '1d' });
   
};


module.exports = Accesstoken;