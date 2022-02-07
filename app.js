
const express = require("express");
const app = express();
const tasks = require('./routes/tasks');
const connectDB = require('./db/connect')
require('dotenv').config();
const notFound = require('./middleware/notfound');
const errorHandlerMiddleware = require("./middleware/error-handler.js");
//middleware
app.use(express.static('./public'))
app.use(express.json());


//routes
app.use('/api/v1/tasks', tasks);
app.use(notFound);
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 3000;

const start = async (portNum) =>{
    try {
        await connectDB(process.env.MONGO_URI);
        app.listen(portNum, console.log(`Server is listening on ${port}...`));
    } catch (error) {
        console.log(error);
    }
}

start(port);

