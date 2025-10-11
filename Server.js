let Express = require('express');
let Cors = require('cors');

let App = Express();

App.use(Express.json());//JSON bodies to use req.body in POST
App.use(Express.urlencoded({extended: true}));//Middleware to parse URL-encoded
App.use(Cors());    

App.listen(3000, ()=>{
    console.log("Server is running on port 3000");
});