var Express = require('express');
var Router = Express.Router();
var Models = require('../Controllers/Projects');
var authController = require('../Controllers/firebaseAuth');

Router.get('/', Models.list);
Router.get('/:id', Models.GetOne);
Router.post('/',authController.requireSignin, Models.create);
Router.put('/:id', authController.requireSignin, Models.Update);
Router.delete('/:id', authController.requireSignin, Models.Delete);
Router.delete('/', authController.requireSignin, Models.DeleteAll);

module.exports = Router;