var Mongoose = require('mongoose');
require('dotenv').config();

module.exports = ()=>
{
    Mongoose.connect(process.env.MongoDB);
    var mongodb = Mongoose.connection;

    mongodb.once('open', ()=>{
        console.log('Connected to MongoDB');
    });

    mongodb.on('error', (E)=>{
        console.log('MongoDB Connection Error: ', E);
    });

    return mongodb;
}