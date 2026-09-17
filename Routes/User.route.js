const express = require('express');
const router = express.Router();
const {registerUser, loginUser} = require('../Controller/User.controller');


router.post("/auth/register",  registerUser);
router.post("/auth/login", loginUser);


module.exports = router;