var connectionFactory = require('../../database.js');

class AcoesController {

    async acoes_config(req, res) {
        const modelo = [
            {
              codigo: 1,
              nome: "Atendimento Receptivo - Proprietário e Balconista",
              conteudo:
                "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam vehicula sollicitudin libero vitae scelerisque. Fusce aliquet ut massa ut egestas. Curabitur ullamcorper nulla a faucibus venenatis. Praesent ut volutpat libero. Cras suscipit mattis efficitur. Suspendisse auctor justo sit amet volutpat egestas. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Aenean ultricies fermentum est vitae finibus. Donec vel metus et massa pellentesque condimentum. Quisque tempus gravida risus eu molestie. Vivamus felis elit, rhoncus eget felis et, sodales pulvinar lacus.     Donec lobortis quis urna sit amet vehicula. Duis in nulla rutrum, venenatis ligula at, sodales erat. Morbi at semper est, eu egestas velit. Vivamus mollis augue nisl, sed molestie lorem bibendum quis. Donec ac pretium massa, sed ultricies metus. In porttitor venenatis convallis. Phasellus euismod sed odio eu maximus."
            },
            { codigo: 2, nome: "Atendimento Receptivo Vendedores", "conteudo": "" },
            { codigo: 3, nome: "Banner Dashboard Vendedores", "conteudo": "" },
            { codigo: 4, nome: "CONECTOR", "conteudo": "" },
            { codigo: 5, nome: "FALE CONOSCO", "conteudo": "" }
          ]
          var connection = await connectionFactory();
          try{
              var resultados = await connection.request().query("select aco_cod as codigo, aco_descricao as acao, CG.cad_descricao as tipo, FORMAT (aco_data_ini, 'dd/MM/yyyy HH:mm:ss') as data_inicial,FORMAT (aco_data_fin, 'dd/MM/yyyy HH:mm:ss') as data_final, case when aco_ativo = 1 then 'Ativo' else 'Inativo' end as status from acoes, cadastros_gerais as CG where aco_tipo = CG.cad_cod  order by aco_cod desc");
			  return res.status(200).json(resultados.recordset);
             } catch(err){
                return res.status(500).json({status: 'erro', detalhes: err}); 
             }
    }
    async pontuacoes(req, res) {
        const modelo =[
            {
              codigo: 1,
              descricao: "Ganhe mais pontos 1",
              status: "Ativo",
              tipo: "Pontos"
            },
            {
              codigo: 2,
              descricao: "Ganhe mais pontos 2",
              status: "Ativo",
              tipo: "Pontos"
            },
            {
              codigo: 3,
              descricao: "Ganhe mais pontos 3",
              status: "Ativo",
              tipo: "Bônus"
            },
            {
              codigo: 4,
              descricao: "Ganhe mais pontos 4",
              status: "Ativo",
              tipo: "Pontos"
            },
            {
              codigo: 5,
              descricao: "Ganhe mais pontos 5",
              status: "Ativo",
              tipo: "Bônus"
            }
          ]
          var connection = await connectionFactory();
          try{
              var resultados = await connection.request().query("select cad_cod as codigo, cad_descricao as descricao, case when cad_ativo = 1 then 'Ativo' else 'Inativo' end as status, case when cad_par01_num = 1 then 'Pontos' else 'Bônus' end as tipo from cadastros_gerais where cad_tipo = 10 and cad_par01_num in (1,2) order by cad_descricao");
              return res.status(200).json(resultados.recordset);
             } catch(err){
                return res.status(500).json({status: 'erro', detalhes: err}); 
             }
    }
    async cadastros_gerais(req, res) {
        const modelo = [
            {
              codigo: 1,
              descricao: "Tipos de Ocorrência"
            },
            {
              codigo: 2,
              descricao: "Tipos de Perguntas"
            },
            {
              codigo: 3,
              descricao: "Tipos de Telefones"
            },
            {
              codigo: 4,
              descricao: "Tipos de Endereço"
            },
            {
              codigo: 5,
              descricao: "Tipos de Ações"
            }
          ]
          var connection = await connectionFactory();
          try{
              var resultados = await connection.request().query("select cad_cod as codigo, cad_descricao as descricao from cadastros_gerais where cad_tipo = 0 order by cad_descricao");
              return res.status(200).json(resultados.recordset);
             } catch(err){
                return res.status(500).json({status: 'erro', detalhes: err}); 
             }
    }
    async combos(req, res) {
       //http://localhost:3000/combos/10
        var tipo = 0;
        if (req.params.tipo){
            tipo = req.params.tipo;
        }
        const resultado = [
            {
              codigo: 1,
              descricao: "Combo 1",
              codigo_interno: "111",
              status: "Ativo"
            },
            {
              codigo: 2,
              descricao: "Combo 2",
              codigo_interno: "111",
              status: "Ativo"
            },
            {
              codigo: 3,
              descricao: "Combo 3",
              codigo_interno: "111",
              status: "Ativo"
            },
            {
              codigo: 4,
              descricao: "Combo 4",
              codigo_interno: "111",
              status: "Ativo"
            },
            {
              codigo: 5,
              descricao: "Combo 5",
              codigo_interno: "111",
              status: "Ativo"
            }
          ]
          //OBSERVACAO
          //Filtrar pela familia
          var connection = await connectionFactory();
          try{
              var resultados = await connection.request().query("select cad_cod as codigo, cad_descricao as descricao, cad_cod_ext as codigo_interno,case when cad_ativo = 1 then 'Ativo' else 'Inativo' end as status from cadastros_gerais where cad_tipo  = " +  tipo +  "  order by cad_cod desc");
              return res.status(200).json(resultados.recordset);
             } catch(err){
                return res.status(500).json({status: 'erro', detalhes: err}); 
             }
    }
    async perguntas(req, res) {
        const resultado = [
            {
              codigo: 1,
              sequencia: 1,
              pergunta: "Pergunta 1",
              tipo: "Resposta única"
            },
            {
              codigo: 2,
              sequencia: 2,
              pergunta: "Pergunta 2",
              tipo: "Resposta única"
            },
            {
              codigo: 3,
              sequencia: 3,
              pergunta: "Pergunta 3",
              tipo: "Resposta única"
            },
            {
              codigo: 4,
              sequencia: 4,
              pergunta: "Pergunta 4",
              tipo: "Resposta única"
            },
            {
              codigo: 5,
              sequencia: 5,
              pergunta: "Pergunta 5",
              tipo: "Resposta única"
            }
          ]
          //OBSERVACAO
          //Filtrar pela Ação
          var acao = 0;
          if (req.params.acao){
            acao = req.params.acao;
          }
          var connection = await connectionFactory();
          try{
              var resultados = await connection.request().query("select per_cod as codigo, per_sequencia as sequencia, per_pergunta as pergunta, 'Respota única' as tipo from perguntas where per_acao = " + acao);
              return res.status(200).json(resultados.recordset);
             } catch(err){
                return res.status(500).json({status: 'erro', detalhes: err}); 
             }
    }
    async opcoes(req, res) {
        const resultado =  [
            {
              codigo: 1,
              descricao: "Opção 1",
              status: "Ativo",
              resposta_certa: "NAO"
            },
            {
              codigo: 2,
              descricao: "Opção 2",
              status: "Ativo",
              resposta_certa: "SIM"
            },
            {
              codigo: 3,
              descricao: "Opção 3",
              status: "Ativo",
              resposta_certa: "NAO"
            },
            {
              codigo: 4,
              descricao: "Opção 4",
              status: "Ativo",
              resposta_certa: "NAO"
            },
            {
              codigo: 5,
              descricao: "Opção 5",
              status: "Ativo",
              resposta_certa: "NAO"
            }
          ]
          //OBSERVACAO
          //Filtrar pela Pergunta
          var pergunta = 0;
          if (req.params.pergunta){
            pergunta = req.params.pergunta;
          }
          var connection = await connectionFactory();
          try{
              var resultados = await connection.request().query("select opr_cod as codigo, opr_descricao as descricao, case when opr_ativo = 1 then 'Ativo' else 'Inativo' end as status, case when opr_valida = 1 then 'Sim' else 'Não' end as resposta_certa from opcao_resposta where opr_pergunta = " + pergunta);
              return res.status(200).json(resultados.recordset);
             } catch(err){
                return res.status(500).json({status: 'erro', detalhes: err}); 
             }
    }

   
    async opcoes_inserir(req, res) {
      //request
      //{
      //  "pergunta": 1365,
      //  "descricao" : "apagar",
      //  "ativo": 1,
      //  "valida": 1
      //  }
      var retorno =  { codigo:1};
      var StrSQL = "";
      var pergunta = 0;
      var descricao = "";
      var ativo  = 0;
      var valida = 0;
      
      if (req.body.pergunta){
        pergunta = req.body.pergunta;
      }
      if (req.body.descricao){
        descricao = req.body.descricao;
      }
      if (req.body.ativo){
        ativo = req.body.ativo;
      }
      if (req.body.valida){
        valida = req.body.valida;
      }
      var connection = await connectionFactory();
      StrSQL = "INSERT INTO opcao_resposta (opr_tipo, opr_pergunta, opr_descricao, opr_ativo, opr_valida) VALUES (0, " + pergunta +", '" + descricao + "', " + ativo + ", " + valida +")";
      let resultados = await connection.request().query(StrSQL);
      return res.status(200).json(retorno);
    }
    async opcoes_atualizar(req, res) {
      //request
      //{
      //  "codigo":10289,
      //  "pergunta": 1365,
      // "descricao" : "apaga2r",
      //  "ativo": 1,
      //  "valida": 1
      // }
      var retorno =  { codigo:1};
      var StrSQL = "";
      var codigo = 0;
      var pergunta = 0;
      var descricao = "";
      var ativo  = 0;
      var valida = 0;
      if (req.body.codigo){
        codigo = req.body.codigo;
      }
      if (req.body.pergunta){
        pergunta = req.body.pergunta;
      }
      if (req.body.descricao){
        descricao = req.body.descricao;
      }
      if (req.body.ativo){
        ativo = req.body.ativo;
      }
      if (req.body.valida){
        valida = req.body.valida;
      }
      var connection = await connectionFactory();
      StrSQL = "UPDATE opcao_resposta SET opr_pergunta = " + pergunta +", opr_descricao = '" + descricao + "', opr_ativo = " + ativo + ", opr_valida = " + valida +" WHERE opr_cod = " + codigo;
      let resultados = await connection.request().query(StrSQL);
      return res.status(200).json(retorno);
    }

    async opcoes_excluir(req, res) {
      var retorno =  { codigo:1};
      var StrSQL = "";
      var codigo = 0;
      if (req.params.codigo){
        codigo = req.params.codigo;
      }
      var connection = await connectionFactory();
      StrSQL = "DELETE from opcao_resposta WHERE opr_cod = " + codigo;
      let resultados = await connection.request().query(StrSQL);
      return res.status(200).json(retorno);
    }
    async cadastros_gerais_inserir(req, res) {
      //request
      //{
      //  "tipo": 10,
      //  "codigo_externo": "123456",
      //  "descricao": "Vou apagar",
      //  "par01_num": "1",
      //  "ativo": 1
      // }
      var retorno =  { codigo:1};
      var StrSQL = "";
      var tipo = 0; 
      var codigo_externo = "";
      var descricao = "";
      var par01_num = null;
      var ativo = 0;
      if (req.body.tipo){
        tipo = req.body.tipo;
      }
      if (req.body.codigo_externo){
        codigo_externo = req.body.codigo_externo;
      }
      if (req.body.descricao){
        descricao = req.body.descricao;
      }
      if (req.body.par01_num){
        par01_num = req.body.par01_num;
      }
      if (req.body.ativo){
        ativo = req.body.ativo;
      }
      var connection = await connectionFactory();
      StrSQL = "INSERT INTO cadastros_gerais (cad_tipo, cad_cod_ext, cad_descricao, cad_par01_num, cad_ativo) VALUES (" + tipo + ", '" + codigo_externo + "', '" + descricao + "', " +  par01_num+ ", " + ativo + ")";
      let resultados = await connection.request().query(StrSQL);
      return res.status(200).json(retorno);
    }
    async cadastros_gerais_atualizar(req, res) {
      //request
      //{
      //  "codigo": 34279,
      //  "tipo": 10,
      //  "codigo_externo": "1234562",
      //  "descricao": "Vou apagar 2",
      //  "par01_num": "1",
      //  "ativo": 1
      // }
      var retorno =  { codigo:1};
      var StrSQL = "";
      var codigo = 0;
      var tipo = 0; 
      var codigo_externo = "";
      var descricao = "";
      var par01_num = null;
      var ativo = 0;
      if (req.body.codigo){
        codigo = req.body.codigo;
      }
      if (req.body.tipo){
        tipo = req.body.tipo;
      }
      if (req.body.codigo_externo){
        codigo_externo = req.body.codigo_externo;
      }
      if (req.body.descricao){
        descricao = req.body.descricao;
      }
      if (req.body.par01_num){
        par01_num = req.body.par01_num;
      }
      if (req.body.ativo){
        ativo = req.body.ativo;
      }
      var connection = await connectionFactory();
      StrSQL = "UPDATE cadastros_gerais SET cad_tipo = " + tipo + ", cad_cod_ext = '" + codigo_externo + "', cad_descricao = '" + descricao + "', cad_par01_num = " +  par01_num+ ", cad_ativo = " + ativo + " WHERE cad_cod = " + codigo;
      let resultados = await connection.request().query(StrSQL);
      return res.status(200).json(retorno);
    }
    async cadastros_gerais_excluir(req, res) {
      var retorno =  { codigo:1};
      var StrSQL = "";
      var codigo = 0;
      if (req.params.codigo){
        codigo = req.params.codigo;
      }
      var connection = await connectionFactory();
      StrSQL = "DELETE from cadastros_gerais WHERE cad_cod = " + codigo;
      let resultados = await connection.request().query(StrSQL);
      return res.status(200).json(retorno);
    }

    
    async perguntas_inserir(req, res) {
      //request
      //{
      //  "pergunta": "VOU APAGAR",
      //  "acao": 313,
      //  "ativo": 1,
      //  "sequencia": "999"
      //  }
      var retorno =  { codigo:1};
      var StrSQL = "";
      var codigo = 0;
      var pergunta = 0;
      var acao = "";
      var ativo  = 0;
      var sequencia = 0;
      if (req.body.pergunta){
        pergunta = req.body.pergunta;
      }
      if (req.body.acao){
        acao = req.body.acao;
      }
      if (req.body.ativo){
        ativo = req.body.ativo;
      }
      if (req.body.sequencia){
        sequencia = req.body.sequencia;
      }
      var connection = await connectionFactory();
      StrSQL = "INSERT INTO perguntas (per_tipo, per_pergunta, per_acao, per_ativo , per_sequencia) values (2707, '" + pergunta +"' , " + acao + "," + ativo + ", '" + sequencia +"')";
      let resultados = await connection.request().query(StrSQL);
      return res.status(200).json(retorno);
    }
    async perguntas_atualizar(req, res) {
      //request
      //{
      //  "codigo":2533,
      //  "pergunta": "VOU APAGAR2",
      //  "acao": 313,
      // "ativo": 1,
      //  "sequencia": "199"
      //  }
      var retorno =  { codigo:1};
      var StrSQL = "";
      var codigo = 0;
      var pergunta = 0;
      var acao = "";
      var ativo  = 0;
      var sequencia = 0;
      if (req.body.codigo){
        codigo = req.body.codigo;
      }
      if (req.body.pergunta){
        pergunta = req.body.pergunta;
      }
      if (req.body.acao){
        acao = req.body.acao;
      }
      if (req.body.ativo){
        ativo = req.body.ativo;
      }
      if (req.body.sequencia){
        sequencia = req.body.sequencia;
      }
      var connection = await connectionFactory();
      StrSQL = "UPDATE perguntas SET per_pergunta = '" + pergunta +"', per_acao = " + acao + ", per_ativo = " + ativo + ", per_sequencia = '" + sequencia +"' WHERE per_cod = " + codigo;
      let resultados = await connection.request().query(StrSQL);
      return res.status(200).json(retorno);
    }
    async perguntas_excluir(req, res) {
      var retorno =  { codigo:1};
      var StrSQL = "";
      var codigo = 0;
      if (req.params.codigo){
        codigo = req.params.codigo;
      }
      var connection = await connectionFactory();
      StrSQL = "DELETE from perguntas WHERE per_cod = " + codigo;
      let resultados = await connection.request().query(StrSQL);
      return res.status(200).json(retorno);
    }
     //As rotas a seguir não foram testadas
    async acoes_excluir(req, res) {
      var retorno =  { codigo:0};
      var StrSQL = "";
      var codigo = 0;
      if (req.params.codigo){
        codigo = req.params.codigo;
      }
      var connection = await connectionFactory();
      StrSQL = "DELETE from acoes WHERE aco_cod = " + codigo;
      let resultados = await connection.request().query(StrSQL);
      return res.status(200).json(retorno);
    }

    async acoes_adicionar(req, res) {
      //http://localhost:3000/acoes_adicionar
      //request
      //{
      //  "aco_descricao": "VOU APAGAR",
      //  "aco_aplicativo": 0,
      //    "aco_tipo":729,
      //    "aco_data_ini": "2019-01-01",
      //    "horario_inicio": "08:00",
      //    "aco_data_fin": "2019-01-30",
      //    "horario_encerramento": "08:00",
      //    "aco_tipo_pontuacao":0,
      //    "aco_ponto": 0,
      //    "aco_envia_sms":"N",
      //    "aco_ativo": 0,
      //    "publico_alvo":"",
      //    "aco_url_video":"",
      //   "aco_texto":""
      //}
      var retorno =  { codigo:1};
      var StrSQL = "";
      
      var aco_aplicativo =  0;
      var aco_descricao =  ""; 
      var aco_tipo =  0;
      var aco_data_ini =  "";
      var horario_inicio =  "";
      var aco_data_fin =  "";
      var horario_encerramento =  "";
      var aco_tipo_pontuacao =  0; 
      var aco_ponto =  0;
      var aco_envia_sms =  "";
      var aco_ativo =  0; 
      var publico_alvo =  ""; 
      var aco_url_video =  "";
      var aco_texto =  "";

      if (req.body.aco_aplicativo){
        aco_aplicativo = req.body.aco_aplicativo;
      }
      if (req.body.aco_descricao){
        aco_descricao = req.body.aco_descricao;
      }
      if (req.body.aco_tipo){
        aco_tipo = req.body.aco_tipo;
      }
      if (req.body.aco_data_ini){
        aco_data_ini = req.body.aco_data_ini;
      }
      if (req.body.horario_inicio){
        horario_inicio = req.body.horario_inicio;
      }
      if (req.body.aco_data_fin){
        aco_data_fin = req.body.aco_data_fin;
      }
      if (req.body.horario_encerramento){
        horario_encerramento = req.body.horario_encerramento;
      }
      if (req.body.aco_tipo_pontuacao){
        aco_tipo_pontuacao = req.body.aco_tipo_pontuacao;
      }
      if (req.body.aco_ponto){
        aco_ponto = req.body.aco_ponto;
      }
      if (req.body.aco_envia_sms){
        aco_envia_sms = req.body.aco_envia_sms;
      }
      if (req.body.aco_ativo){
        aco_ativo = req.body.aco_ativo;
      }
      if (req.body.publico_alvo){
        publico_alvo = req.body.publico_alvo;
      }
      if (req.body.aco_url_video){
        aco_url_video = req.body.aco_url_video;
      }
      if (req.body.aco_texto){
        aco_texto = req.body.aco_texto;
      }

            
      var connection = await connectionFactory();  
      StrSQL = "insert into acoes (aco_aplicativo, aco_descricao,	aco_tipo,	aco_data_ini,	aco_data_fin,	aco_tipo_pontuacao,	aco_pontos, aco_envia_sms,	aco_ativo, aco_par01_num, aco_url_video, aco_texto) ";
      StrSQL += " values (";
      StrSQL += " '" + aco_aplicativo + "', '" + aco_descricao + "', '" + aco_tipo + "', ";
      StrSQL += " '" + aco_data_ini +  " " + horario_inicio +"', '" + aco_data_fin + " " + horario_encerramento +"', ";
      StrSQL += " '"  + aco_tipo_pontuacao + "', '" + aco_ponto +  "', '" + aco_envia_sms + "', ";
      StrSQL += " '" + aco_ativo + "', '" + publico_alvo +  "', '" + aco_url_video +  "', '" + aco_texto + "' ";
      StrSQL += " )";
      let resultados = await connection.request().query(StrSQL);
      return res.status(200).json(retorno);
    }

    async acoes_atualizar(req, res) {
      //http://localhost:3000/acoes_atualizar
      //request
      //{
      //  "codigo": 516,
      //  "aco_descricao": "VOU APAGAR - TESTE",
      //  "aco_aplicativo": 0,
      //    "aco_tipo":729,
      //    "aco_data_ini": "2019-01-01",
      //    "horario_inicio": "08:00",
      //    "aco_data_fin": "2019-01-30",
      //    "horario_encerramento": "08:00",
      //    "aco_tipo_pontuacao":0,
      //    "aco_ponto": 0,
      //    "aco_envia_sms":"N",
      //    "aco_ativo": 0,
      //    "publico_alvo":"",
      //    "aco_url_video":"",
      //    "aco_texto":""
      //}
      var retorno =  { codigo:1};
      var StrSQL = "";
      var codigo = 0;
      var aco_aplicativo =  0;
      var aco_descricao =  ""; 
      var aco_tipo =  0;
      var aco_data_ini =  "";
      var horario_inicio =  "";
      var aco_data_fin =  "";
      var horario_encerramento =  "";
      var aco_tipo_pontuacao =  0; 
      var aco_ponto =  0;
      var aco_envia_sms =  "";
      var aco_ativo =  ""; 
      var publico_alvo =  ""; 
      var aco_url_video =  "";
      var aco_texto =  "";

      if (req.body.codigo){
        codigo = req.body.codigo;
      }
      if (req.body.aco_aplicativo){
        aco_aplicativo = req.body.aco_aplicativo;
      }
      if (req.body.aco_descricao){
        aco_descricao = req.body.aco_descricao;
      }
      if (req.body.aco_tipo){
        aco_tipo = req.body.aco_tipo;
      }
      if (req.body.aco_data_ini){
        aco_data_ini = req.body.aco_data_ini;
      }
      if (req.body.horario_inicio){
        horario_inicio = req.body.horario_inicio;
      }
      if (req.body.aco_data_fin){
        aco_data_fin = req.body.aco_data_fin;
      }
      if (req.body.horario_encerramento){
        horario_encerramento = req.body.horario_encerramento;
      }
      if (req.body.aco_tipo_pontuacao){
        aco_tipo_pontuacao = req.body.aco_tipo_pontuacao;
      }
      if (req.body.aco_ponto){
        aco_ponto = req.body.aco_ponto;
      }
      if (req.body.aco_envia_sms){
        aco_envia_sms = req.body.aco_envia_sms;
      }
      if (req.body.aco_ativo){
        aco_ativo = req.body.aco_ativo;
      }
      if (req.body.publico_alvo){
        publico_alvo = req.body.publico_alvo;
      }
      if (req.body.aco_url_video){
        aco_url_video = req.body.aco_url_video;
      }
      if (req.body.aco_texto){
        aco_texto = req.body.aco_texto;
      }
            
      var connection = await connectionFactory();  
      StrSQL = "UPDATE acoes SET ";
      StrSQL += " aco_aplicativo = '" + aco_aplicativo + "', ";
      StrSQL += " aco_descricao = '" + aco_descricao + "', ";
      StrSQL += " aco_tipo =  '" + aco_tipo + "', ";
      StrSQL += " aco_data_ini =  '" + aco_data_ini +  " " + horario_inicio + "', ";
      StrSQL += " aco_data_fin = '" + aco_data_fin +  " " + horario_encerramento + "', ";
      StrSQL += " aco_tipo_pontuacao =  '" + aco_tipo_pontuacao + "', aco_pontos = '" + aco_ponto + "', ";
      StrSQL += " aco_envia_sms =  '" + aco_envia_sms + "', ";
      StrSQL += " aco_ativo =  '" + aco_ativo + "', aco_par01_num = '" + publico_alvo + "', ";
      StrSQL += " aco_url_video =  '" + aco_url_video + "',  aco_texto = '"  + aco_texto +  "' ";
      StrSQL += " WHERE ACO_COD = " + codigo;
      let resultados = await connection.request().query(StrSQL);
      return res.status(200).json(retorno);
    }

    async acao(req, res) {
      //http://localhost:3000/acao/501
      var retorno =  {};
      var StrSQL = "";
      var codigo = 0;
      if (req.params.codigo){
        codigo = req.params.codigo;
      }
      
      var connection = await connectionFactory(); 
      StrSQL="SELECT * from acoes where aco_cod = " + codigo;
      let resultados = await connection.request().query(StrSQL);
      resultados.recordset.forEach(function(item) {
        retorno.aco_descricao = item.aco_descricao;
		    retorno.aco_tipo = item.aco_tipo;
		    retorno.aco_data_ini = item.aco_data_ini;
		    retorno.horario_inicio = item.aco_data_ini; //Extrair horario
		    retorno.aco_data_fin = item.aco_data_fin;
		    retorno.horario_encerramento = item.aco_data_fin; //Extrair horario
		    retorno.aco_tipo_pontuacao = item.aco_tipo_pontuacao;
		    retorno.aco_envia_sms = item.aco_envia_sms;
		    retorno.aco_ativo = item.aco_ativo;
		    retorno.aco_pontos = item.aco_pontos;
    		retorno.publico_alvo = item.aco_par01_num;
		  	retorno.aco_url_video =  item.aco_url_video;
		    retorno.aco_texto = item.aco_texto;
      });
      return res.status(200).json(retorno); 
    }

    async pesquisa(req, res) {
      //http://localhost:3001/pesquisa/514
      var retorno = [];
      const resultado = [
          {
            codigo: 1,
            sequencia: 1,
            pergunta: "Pergunta 1",
            tipo: "Resposta única",
            opcoes: [
              {
                codigo: 1,
                descricao: "Opção 1",
                status: "Ativo",
                resposta_certa: "NAO"
              }]
          }
        ]
        //OBSERVACAO
        //Filtrar pela Ação
        var acao = 0;
        if (req.params.acao){
          acao = req.params.acao;
        }
        var connection = await connectionFactory();
        try{
            var resultados = await connection.request().query("select per_cod as codigo, per_sequencia as sequencia, per_pergunta as pergunta, 'Respota única' as tipo from perguntas where per_acao = " + acao);
            resultados.recordset.forEach(function(item) {
              var tmp = {};
              tmp.codigo = item.codigo;
              tmp.sequencia = item.sequencia;
              tmp.pergunta = item.pergunta;
              tmp.tipo = item.tipo;
              retorno.push(tmp);
            });  
             
            for (var index = 0; index < retorno.length; index++) { 
              var tmp_array_opcoes = [];
              var pergunta = retorno[index].codigo;
              var resultados2 = await connection.request().query("select opr_cod as codigo, opr_descricao as descricao, case when opr_ativo = 1 then 'Ativo' else 'Inativo' end as status, case when opr_valida = 1 then 'Ativo' else 'Inativo' end as resposta_certa from opcao_resposta where opr_pergunta = " + pergunta);
              resultados2.recordset.forEach(function(item2) {
                var tmp2 = {codigo: item2.codigo, descricao: item2.descricao, status: item2.status, resposta_certa: item2.resposta_certa};
                tmp_array_opcoes.push(tmp2);
              });
              retorno[index].opcoes = tmp_array_opcoes;
            };
            return res.status(200).json(retorno); 

           } catch(err){
              return res.status(500).json({status: 'erro', detalhes: err}); 
           }
      }

      //
      async pesquisa_responder(req, res) {
         //http://localhost:3001/pesquisa_responder
         //request
         //{
         // "acao": 513,
         // "entidade": 625,
         // "operador": 10,
         // "respostas":[
         //   {
         //     "pergunta": 2529,
         //     "respostas": [
         //       {
         //         "codigo": 10287,
         //           "texto": "opcional"
         //       }
         //     ]
         //     }
         // ]
         //}
        var retorno = {codigo: 0};
        var acao = 0;
        var conta = 0;
        var operador = 0;
        var entidade = 0;
        var respostas = [];
        if (req.body.acao){
          acao = req.body.acao;
        }
        if (req.body.operador){
          operador = req.body.operador;
        }
        if (req.body.entidade){
          entidade = req.body.entidade;
        }
        if (req.body.respostas){
          respostas = req.body.respostas;
        }
        var connection = await connectionFactory();
        for (var index = 0; index < respostas.length; index++) { 
            var tmp_gravar = true;
            var resultados = await connection.request().query("SELECT res_cod FROM respostas WHERE res_entidade = " + entidade + " AND res_pergunta = " + respostas[index].pergunta);
            resultados.recordset.forEach(function(item) {
              tmp_gravar = false;
            });
            if (tmp_gravar){
              for (var index2 = 0; index2 < respostas[index].respostas.length; index2++) { 
                var pergunta = respostas[index].pergunta;
                var opcao_resposta = respostas[index].respostas[index2].codigo;
                var texto = respostas[index].respostas[index2].texto;
                var resultados2 = await connection.request().query("INSERT INTO RESPOSTAS (res_entidade, res_pergunta, res_opcao_resposta, res_origem, res_data, res_par01_num, res_texto) VALUES (" + entidade + ", " + pergunta + "," + opcao_resposta  + ",6374, convert(datetime, getdate(), 103), " + operador + ", '" + texto + "')");  
                retorno.codigo = 1;
              }
            }
        }

        var resultados3 = await connection.request().query("SELECT con_cod FROM contas WHERE con_entidade = " + entidade);
            resultados3.recordset.forEach(function(item3) {
              conta =  item3.con_cod
            });

        var gravar_acao = true;
        var coa_cod = 0;
        var resultados4 = await connection.request().query("SELECT coa_cod FROM contas_acoes WHERE coa_acao = " + acao + " AND coa_conta = " +  conta);
        resultados4.recordset.forEach(function(item2) {
          gravar_acao = false;
          coa_cod = item2.coa_cod;
          retorno.codigo = item2.coa_cod;
        });
        if (gravar_acao){
          var resultados5 = await connection.request().query("INSERT INTO contas_acoes (coa_acao, coa_conta, coa_participa, coa_status, coa_data_cad, coa_data_atu, coa_par01_num) VALUES (" + acao + ", " + conta + ", 'S', 5913,  convert(datetime, getdate(),103),  convert(datetime, getdate(),103), " + operador +  ")");
        } else {
          var resultados6 = await connection.request().query("UPDATE contas_acoes set coa_status = 5913, coa_data_atu = convert(datetime, getdate(),103), coa_par01_num = " + operador +  " WHERE coa_cod = " + coa_cod);
        }
        return res.status(200).json(retorno); 

      }

      async respostas(req, res) {
        //http://localhost:3001/respostas
        //request
        //{
        //  "acao": 513,
        //    "entidade": 39916
        //}
        const modelo = [
          {
              codigo: 49715,
              pergunta: "Quantos balconistas e gerentes há na loja?",
              resposta: "1",
              resposta_informada: "3",
              data: "19/11/2019 12:18:44",
              resposta_correta: "Sim"
          }
       ]
        var acao = 0;
        var entidade = 0;
        if (req.body.acao){
          acao = req.body.acao;
        }
        if (req.body.entidade){
          entidade = req.body.entidade;
        }
        var connection = await connectionFactory();

        try {
          var resultados = await connection.request().query("select res_cod as codigo, per_pergunta as pergunta, opr_descricao as resposta, res_texto as resposta_informada, FORMAT (res_data, 'dd/MM/yyyy HH:mm:ss') as data,          case when opr_valida = 1 then 'Sim' else 'Não' end as resposta_correta from respostas, perguntas, opcao_resposta where res_pergunta = per_cod and opr_cod = res_opcao_resposta and per_acao = " + acao + " and res_entidade =" + entidade);
          return res.status(200).json(resultados.recordset);
        } catch(err){
          return res.status(500).json({status: 'erro', detalhes: err}); 
        }
      }
}    
export default new AcoesController();           