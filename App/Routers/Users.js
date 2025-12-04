var express = require('express');
var Models = require('../Controllers/Users');
var UserAuth = require('../Controllers/firebaseAuth');
var Router = express.Router();

Router.get('/', Models.List);
Router.post('/', Models.Create);
Router.get('/:id',UserAuth.requireSignin, Models.hasAuthorization, Models.read);
Router.param('id', Models.SetUserByID);
Router.put('/:id',UserAuth.requireSignin, Models.hasAuthorization, Models.Update);
Router.delete('/:id', UserAuth.requireSignin, Models.hasAuthorization, Models.Delete);
Router.delete('/', UserAuth.requireSignin, Models.hasAuthorization, Models.DeleteAll);

module.exports = Router;