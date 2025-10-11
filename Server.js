var Express = require('express');
var DbConnection = require('./Config/DataBase');
var Logger = require('morgan');
var HttpErrors = require('http-errors');
var IndexRouter = require('./App/Routers/Index');
var UserRouter = require('./App/Routers/Users');


var App = Express();


App.use(Express.json());//JSON bodies to use req.body in POST
App.use(Express.urlencoded({extended: true}));//Middleware to parse URL-encoded

DbConnection();

App.use(Logger('dev'));  

App.use('/', IndexRouter);
App.use('/api/users', UserRouter);

//Error Handler
App.use((req, res, next)=>
{
    next(HttpErrors(404));
});

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

App.listen(3000, ()=>{
    console.log("Server is running http://localhost:3000/");
});