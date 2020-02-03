const express = require('express');

const UserController = require('./controllers/UserController');
const PasswordResetController = require('./controllers/PasswordResetController');
const RequerimentsController = require('./controllers/RequerimentsController');

const routes = express.Router();
//Resets
routes.post('/passwordreset', PasswordResetController.show);
//Users
routes.post('/users', UserController.index);
routes.post('/user/create', UserController.store);
routes.post('/user/login', UserController.show);
routes.put('/user/update/:id', UserController.update);
routes.delete('/user/delete/:id', UserController.destroy);

//Requerimentos
routes.get('/:id/requeriments/list', RequerimentsController.index);
routes.post('/:id/requeriments/create', RequerimentsController.store);
routes.put('/:id/requeriments/update', RequerimentsController.update);
routes.delete('/:id/requeriments/delete', RequerimentsController.destroy);

//Modulos
/* routes.post('/:id/moduls/list', ModulesController.index);
routes.post('/:id/moduls/create', ModulesController.store);
routes.put('/:id/moduls/update', ModulesController.update);
routes.delete('/:id/moduls/delete', ModulesController.destroy); */



module.exports = routes;