import 'dotenv/config'; // variaveis de ambiente que esta na raiz no arquivo .env

import express from 'express';
import path from 'path';
import cors from 'cors';
import 'express-async-errors';
import routes from './routes';
import Youch from 'youch';
import morgan from 'morgan';
import logger from './logger';

class App{
  constructor(){
    this.server = express();
    this.middlewares();
    this.routes();
    this.exceptionHandler();
  }

  middlewares(){
    this.server.use(cors())
    this.server.use(express.json());
	this.server.use(morgan("combined", { stream: logger.stream }));
  }

  routes(){
    this.server.use(routes);
	this.server.use(function(req, res, next) {
      res.status(404).send({erro:"Rota não localizada!"});
    });
  }
  // middleware de tratamento de erros
  exceptionHandler(){
    this.server.use( async (err, req, res, next) => {

      if(process.env.NODE_ENV == 'development'){
        const errors = await new Youch( err, req).toJSON();
        return res.status(500).json(errors);
      }
      console.log(err); //Retirar em producao
	  logger.error(logger.combinedFormat(err, req, res));
      logger.error(err);
      return res.status(500).json({ erro: 'Erro interno de servidor' });
    });
  }
}
export default new App().server;