const UserModel = require('../Models/User.Model.js');
const bcrypt = require('bcrypt');
const joi = require('joi');
const Accesstoken = require('../Token.js');


const registerUser = async (req, res, next) => {
    const registerSchema = joi.object({
        name: joi.string().required(),
        email: joi.string().email().required(),
        password: joi.string().min(6).required()
    });
    try {
    const {error} = registerSchema.validate(req.body);
    if (error) {
        return res.status(400).json({message: error.details[0].message})   
     }
        const {name, email, password} = req.body;

     const existingUser = await UserModel.findOne({email: email});
     if (existingUser) {
        return res.status(400).json({message: "User email already in use"});
     }

    const salt = await bcrypt.genSalt(12);
    const hashed= await bcrypt.hash(password, salt);

    const newUser = new UserModel({
        name: name,
        email: email,
        password: hashed
    });
    await newUser.save();
    res.status(201).json({message: "User registered successfully", data: {
        _id: newUser._id, 
        name: newUser.name, 
        email: newUser.email}});
    } catch (error) {
console.error(error);
next(error);
    }
};

const loginUser = async (req, res, next) => {
    const loginSchema = joi.object ({
        email: joi.string().email().required(),
        password: joi.string().min(6).required()
    })
const {error} = loginSchema.validate(req.body);
if (error) {
    return res.status(400).json({message: error.details[0].message});
}
try {
    const {email, password} = req.body;
const user = await UserModel.findOne({email: email});
if (!user) {
    return res.status(400).json({message: "User does not exist"});
}

const isMatch = await bcrypt.compare(password, user.password);
if (!isMatch) {
    return res.status(401).json({message: "Invalid credentials"});
}

const token = Accesstoken(user);

res.status(200).json({message: "User logged in successfully", user, token});
} catch (error) {
    console.error(error)
    next(error)
}

};




module.exports = {registerUser, loginUser};