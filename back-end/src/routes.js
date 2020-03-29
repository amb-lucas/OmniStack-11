const express = require("express");
const { celebrate, Segments, Joi } = require("celebrate");

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

// SESSIONS
// Autenticação
routes.post(
  "/sessions",
  celebrate({
    [Segments.BODY]: Joi.object().keys({
      id: Joi.string().required()
    })
  }),
  SessionController.create
);

// ONGS
// Listar todas as ONGs
routes.get("/ongs", OngController.index);

// Criar uma nova ONG
routes.post(
  "/ongs",
  celebrate({
    [Segments.BODY]: Joi.object().keys({
      name: Joi.string().required(),
      email: Joi.string()
        .required()
        .email(),
      whatsapp: Joi.number(),
      whatsapp: Joi.string()
        .required()
        .min(10)
        .max(13),
      city: Joi.string().required(),
      uf: Joi.string()
        .required()
        .length(2)
    })
  }),
  OngController.create
);

// CASES
// Ver todos os casos (paginado)
routes.get(
  "/cases",
  celebrate({
    [Segments.QUERY]: Joi.object().keys({
      page: Joi.number().min(1)
    })
  }),
  CaseController.index
);

// Criar novo caso
routes.post(
  "/cases",
  celebrate({
    [Segments.BODY]: Joi.object().keys({
      title: Joi.string().required(),
      description: Joi.string().required(),
      value: Joi.number()
        .required()
        .min(0)
    }),
    [Segments.HEADERS]: Joi.object({
      authorization: Joi.string().required()
    }).unknown()
  }),
  CaseController.create
);

// Deletar caso
routes.delete(
  "/cases/:id",
  celebrate({
    [Segments.PARAMS]: Joi.object({
      id: Joi.number().required()
    })
  }),
  CaseController.delete
);

// PROFILE
// Ver casos a partir de uma ONG
routes.get(
  "/profile",
  celebrate({
    [Segments.HEADERS]: Joi.object({
      authorization: Joi.string().required()
    }).unknown()
  }),
  ProfileController.index
);

module.exports = routes;
