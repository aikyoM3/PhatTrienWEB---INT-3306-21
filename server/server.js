const express = require('express');
const app = express();
const path = require('path');
const connectDB = require('./config/db');
const cookieParser = require( 'cookie-parser' );
const cors = require('cors')
const corsOptions = require('./config/corsOptions')
require('dotenv').config()

const bodyparser = require("body-parser");
app.use(bodyparser.urlencoded({ extended: false }));
app.use(bodyparser.json());

app.use(cookieParser())
 
app.use(express.urlencoded({ extended: true }));

app.use(express.json());

app.use(cors(corsOptions))

port = process.env.PORT;
connectDB();

app.use('/register', require('./routes/registerRoutes'));
app.use('/login', require('./routes/loginRoutes'));


app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
})