require('dotenv').config();

const express = require('express');
const app = express();
const PORT = process.env.PORT
const DBconnect = require("./Database/Dbconnect.js");
const errorHandler = require('./Middlewares/ErrorHandler.js');
const logRequests = require('./Middlewares/Logger.js');


const NoteRoute = require('./Routes/Note.route.js');
const UserRoute = require('./Routes/User.route.js');

DBconnect()


app.use(express.json());
app.use('/api', NoteRoute);
app.use('/api/users', UserRoute);
app.use(errorHandler);
app.use(logRequests);

app.get('/', (req, res) => {
    res.status(200).json("Note API on point")
});

app.listen(PORT, () => {
    console.log (`Server is listening on PORT ${PORT}`)
});