const jwt = require('jsonwebtoken');
const UserModel = require('../Models/User.Model.js');

const requireAuth = async (req, res, next) => {
    const authHeader = req.header ('Authorization');
if (!authHeader || !authHeader.startsWith('Bearer')) {
        return res.status(401).json({ message: 'Access denied' });
}
    const token = authHeader.replace('Bearer ', '');
        try {
            const payload = jwt.verify(token, process.env.JWT_SECRET);

console.log("Decoded Token Payload:", payload);

            const user = await UserModel.findById(payload.userId);
            if (!user) {
                return res.status(401).json ({message: 'User not found'});
            }
            req.user = user;
            next();
        } catch (error) {
            console.error("Auth Error:", error.message);  
        return res.status(401).json({ message: 'Invalid token' });
    
        }
};

module.exports = requireAuth;
