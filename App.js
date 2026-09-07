require('dotenv').config();

const express = require('express');
const app = express();
const PORT = process.env.PORT
const DBconnect = require("./Database/Dbconnect.js")


DBconnect()


app.use(express.json());



app.listen(PORT, () => {
    console.log (`Server is listening on PORT ${PORT}`)
});