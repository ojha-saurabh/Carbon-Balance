const express = require("express");
const app = express();
const cors = require("cors");
const path = require("path");

app.use(express.urlencoded({limit:'50mb', extended:true, parameterLimit:1000000}));
app.use(express.json());
app.use(cors({origin:"http://localhost:4200"}))
app.use('/public/user/images', express.static(path.join(__dirname, '../public/user/images')));

//Token validator


//Routes
const authRouter = require('./routes/authRoutes');
const carbonRouter = require('./routes/carbonRoutes');
const commonRouter = require('./routes/commonRoutes');

//middleware
app.use('/api/v1/carbon', carbonRouter);
app.use('/api/v1/auth', authRouter);
app.use('/api/v1/common', commonRouter);

module.exports = app;