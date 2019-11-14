const express = require('express');

const AuthenticationController = require('./controllers/AutenticationController');

const routes = express.Router();

routes.post('/sessions', AuthenticationController.index)


module.exports = routes;