var express = require('express');
var Models = require('../Controllers/Users');
var Router = express.Router();

Router.get('/', Models.List);
Router.get('/:id', Models.GetOne);
Router.post('/', Models.Create);
Router.put('/:id', Models.Update);
Router.delete('/:id', Models.Delete);
Router.delete('/', Models.DeleteAll);

module.exports = Router;