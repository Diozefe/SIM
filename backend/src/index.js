const express = require('express');
const cors =  require('cors')
const firebaseConfig = require('./config/firebaseConfig')

const routes = require('./routes');
const app =  express();
//Fim importes


firebaseConfig();
//Permissão de acesso de requisições http
app.use(cors());

//Atribuição de uso de JSON em requisições http
app.use(express.json());

//Atribuição de Uso da Rotas
app.use(routes);

//--------------------------------------------//
//req.headers Acessar headrs do documento
//req.query Acessar query params
//req.params Acessar route params
//req.bady Acessar corpo da requisição (criar ou editar registro)

app.listen(3333);