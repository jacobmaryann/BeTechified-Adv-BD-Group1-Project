const mongoose = require('mongoose');

const DBconnect = async () => {
  try {  
    await mongoose.connect(process.env.MongoDB_URI);
    console.log("Database connected successfully");
    } catch (error) {
    console.log("Database connection failed", error);
    process.exit(1);
  }
    
};

module.exports = DBconnect;