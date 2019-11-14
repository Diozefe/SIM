const express = require('express');

const AuthenticationController = require('./controllers/AutenticationController');
const CreateUserController = require('./controllers/CreateUserController');

const routes = express.Router();

routes.post('/sessions', AuthenticationController.index);
routes.post('/createusers', CreateUserController.store);

module.exports = routes;