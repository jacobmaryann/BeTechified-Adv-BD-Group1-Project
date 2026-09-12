require('dotenv').config();

const express = require('express');
const app = express();
const PORT = process.env.PORT
const DBconnect = require("./Database/Dbconnect.js")
const logger = require('./Middlewares/Logger.js');
const { errorHandler } = require('./Middlewares/ErrorHandler.js');
const noteRoutes = require('./Routes/Note.route.js');
DBconnect()

app.use(express.json());
app.use(logger);

app.use('/api/notes', noteRoutes);

app.use(errorHandler); // must be last

app.listen(PORT, () => {
    console.log (`Server is listening on PORT ${PORT}`)
});