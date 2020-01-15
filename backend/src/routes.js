const express = require('express');

const AuthenticationController = require('./controllers/AutenticationController');
const UserController = require('./controllers/UserController');

const routes = express.Router();

routes.post('/sessions', AuthenticationController.index);
routes.post('/createusers', UserController.store);

module.exports = routes;