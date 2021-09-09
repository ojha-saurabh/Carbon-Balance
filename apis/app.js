const express = require("express");
const app = express();
const cors = require("cors");

app.use(express.urlencoded({limit:'50mb', extended:true, parameterLimit:1000000}));
app.use(express.json());
app.use(cors({origin:"http://localhost:4200"}))

//Routes
const authRouter = require('./routes/authRoutes');
const carbonRouter = require('./routes/carbonRoutes');

//middleware
app.use('/api/v1/carbon', carbonRouter);
app.use('/api/v1/auth', authRouter);

module.exports = app;