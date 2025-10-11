var Mongoose = require('mongoose');


module.exports = ()=>
{
    Mongoose.connect("mongodb+srv://Admin_DB:asdgGJThtjy@cluster0.1lkwsbj.mongodb.net/Portfolio?retryWrites=true&w=majority&appName=Cluster0");
    var mongodb = Mongoose.connection;

    mongodb.once('open', ()=>{
        console.log('Connected to MongoDB');
    });

    mongodb.on('error', (E)=>{
        console.log('MongoDB Connection Error: ', E);
    });

    return mongodb;
}