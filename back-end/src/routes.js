const express = require("express");
const crypto = require("crypto");

const OngController = require("./controllers/ongController");
const CaseController = require("./controllers/caseController");
const ProfileController = require("./controllers/profileController");
const SessionController = require("./controllers/sessionController");

const routes = express.Router();

/*
  Tipos de Parâmetros:

  Query Params: Parâmetros nomeados enviados na rota após '?' (filtros, paginação)
  ->  /users?name=Goku&idade=12
  acessar com request.query

  Route Params: Parâmetros utilizados para identificar recursos enviados na URL sem '?'
  ->  /users/1/
  acessar com request.params

  Request Body: Corpo da requisição, criar ou alterar recursos
  ->  /users
  acessar com request.body

  Request Headers: Informação do contexto da Requisição
  acessar com request.headers
*/

routes.post("/sessions", SessionController.create);

routes.get("/ongs", OngController.index);
routes.post("/ongs", OngController.create);

routes.get("/cases", CaseController.index);
routes.post("/cases", CaseController.create);
routes.delete("/cases/:id", CaseController.delete);

routes.get("/profile", ProfileController.index);

module.exports = routes;
