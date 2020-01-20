import jwt from 'jsonwebtoken';
import { promisify } from 'util';
import authConfig from '../../config/auth'
var connectionFactory = require('../../database.js');

export default async (req, res, next) =>{
  const authHeader = req.headers.authorization;
  if(!authHeader){
    return res.status(401).json({ error: "Token inexistente" });
  }

  const [, token] = authHeader.split(' ');

  try{
    const decoded = await promisify(jwt.verify)(token, authConfig.secret);
    var connection = await connectionFactory();
    try{
      var resultados = await connection.request().query("select usu_cod from usuarios_sao where usu_ativo = 1 and usu_cod " +decoded.id );
      var continuar = false;
      resultados.recordset.forEach(function(item) {
        continuar = true;
      });
      if (continuar){
        req.userId = decoded.id;
      } else {
        return res.status(401).json({ error: "Usuário não autorizado"});
      }
    } catch(err){
      return res.status(500).json({status: 'erro', detalhes: err}); 
    }
    return next();

  } catch(err){
    return res.status(401).json({ error: "Token Inválido"})
  }
  
};