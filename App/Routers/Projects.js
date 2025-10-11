var Express = require('express');
var Router = Express.Router();
var Models = require('../Controllers/Projects');

Router.get('/', Models.List);
Router.get('/:id', Models.GetOne);
Router.post('/', Models.Create);
Router.put('/:id', Models.Update);
Router.delete('/:id', Models.Delete);
Router.delete('/', Models.DeleteAll);

module.exports = Router;