const MongoClient = require('mongodb').MongoClient;
const url = process.env.ENVIRONMENT == 'production'?'':'mongodb://localhost:27017/';
let mongoDb;

MongoClient.connect(url, {useNewUrlParser: true, useUnifiedTopology: true}, (err,dbo)=>{
    if(err) throw err;
    mongoDb = dbo.db(process.env.DATABASE_NAME);
    // console.log(db.db)
})



function get(){
    return mongoDb;
}

function close(){
    mongoDb.close();
}

module.exports = {
    get,
    close
};