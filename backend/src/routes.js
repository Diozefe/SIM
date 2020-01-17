const express = require('express');

const AuthenticationController = require('./controllers/AutenticationController');
const UserController = require('./controllers/UserController');

const routes = express.Router();
//Usuários
routes.post('/users', UserController.index);
routes.post('/user/create', UserController.store);
routes.post('/user/login', UserController.show);
routes.put('/user/update/:id', UserController.update);
routes.delete('/user/delete/:id', UserController.destroy);

module.exports = routes;