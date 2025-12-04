var Express = require('express');
var DbConnection = require('./Config/DataBase');
var Logger = require('morgan');
var cors = require('cors');
var HttpErrors = require('http-errors');
var IndexRouter = require('./App/Routers/Index');
var UserRouter = require('./App/Routers/Users');
var ContactRouter = require('./App/Routers/Contacts');
var ProjectRouter = require('./App/Routers/Projects');
var ServiceRouter = require('./App/Routers/Services');
var FirebaseAdmin = require('./Config/firebaseAdmin');


var App = Express();

App.use(cors());
App.use(Express.json());//JSON bodies to use req.body in POST
App.use(Express.urlencoded({extended: true}));//Middleware to parse URL-encoded

DbConnection();
FirebaseAdmin();

App.use(Logger('dev'));//Error Handler  

App.use('/', IndexRouter);
App.use('/api/users', UserRouter);
App.use('/api/contacts', ContactRouter);
App.use('/api/projects', ProjectRouter);
App.use('/api/services', ServiceRouter);

// App.use((req, res, next)=>
// {
//     next(HttpErrors(404));
// });

//Using Logger to log the errors
App.use((err, req, res, next)=> 
{
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
    res.status(err.status || 500);
    res.json(
    {
      success: false,
      message: err.message
    });
});

App.listen(3000 || 1000, ()=>{
    console.log("Server is running http://localhost:3000/");
});