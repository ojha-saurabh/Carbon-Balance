const mongoose = require('mongoose');
const url = process.env.ENVIRONMENT == 'production'?'':'mongodb://localhost:27017/';
//MogoDB Connection
const db = mongoose.connect(`${url}${process.env.DATABASE_NAME}`, {useNewUrlParser: true, useUnifiedTopology: true}, (err, dbo)=>{
    if(err){
        console.log(err);
    }
    if(dbo){
        console.log('Database connected');
    }
});

module.exports.db = db;