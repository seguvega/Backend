let express = require('express');

let Router = express.Router();

Router.get('/', (req, res)=>{
    res.json(
        {
            message: "Welcome To My Portafolio API"
        }
    )
});

module.exports = Router;