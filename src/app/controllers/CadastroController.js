var connectionFactory = require('../../database.js');

class CadastroController {
    async entidade(req, res) {
      var codigo = 625;
      if (req.params.codigo){
        codigo = req.params.codigo;
      }
        const modelo = {
            codigo: 1,
            CPF: "11111111111",
            categoria: "Premium",
            subcategoria: "Gold",
            pontos: 10000,
            status_entidade: 2476,
            status_conta: 36,
            descricao_status_conta: "Consulta e Troca",
            descricao_status_entidade: "Ativo",
            nome: "BINS do TI",
            data_nascimento: "01/04/1970",
            sexo: 23,
            descricao_sexo: "Masculino",
            estado_civil: 0,
            descricao_estado_civil: "Não informado",
            cargo: 0,
            descricao_cargo: "Gerente",
            email: "daniel.bins@teste.com.br",
            email_capturado: "daniel.bins@teste.com.br"
            }
        var connection = await connectionFactory();
        try{
          var resultados = await connection.request().query("select top 1 ent_cod as codigo, ent_doc01 as CPF, 'Premium' as categoria, 'Gold' as subcategoria, (sal_pontos + sal_bonus - sal_premios - sal_expirados) as pontos, ent_status as status_entidade, con_status as status_conta, CG5.cad_descricao as descricao_status_conta, CG4.cad_descricao as descricao_status_entidade, ent_nome as nome, FORMAT (ent_data_nasc, 'd', 'pt-BR' ) as data_nascimento, ent_sexo as sexo, CG3.cad_descricao as descricao_sexo,  ent_estado_civil as estado_civil, CG2.cad_descricao as descricao_estado_civil, ent_profissao as cargo, CG.cad_descricao as descricao_profissao, ent_email as email, ent_email_capt as email_capturado from entidades INNER JOIN contas ON entidades.ent_cod =contas.con_entidade INNER JOIN cadastros_gerais AS CG5 ON contas.con_status = CG5.cad_cod LEFT OUTER JOIN saldos ON contas.con_cod =saldos.sal_conta LEFT OUTER JOIN cadastros_gerais AS CG ON entidades.ent_profissao = CG.cad_cod LEFT OUTER JOIN cadastros_gerais AS CG2 ON entidades.ent_estado_civil = CG2.cad_cod LEFT OUTER JOIN cadastros_gerais AS CG4 ON entidades.ent_status = CG4.cad_cod LEFT OUTER JOIN cadastros_gerais AS CG3 ON entidades.ent_sexo = CG3.cad_cod WHERE ent_cod = " + codigo);
            return res.status(200).json(resultados.recordset);
        } catch(err){
            return res.status(500).json({status: 'erro', detalhes: err}); 
        }
    }

    async entidades_pesquisar(req, res) {
      //request
      //{
      //  "criterio": "valor a ser pesquisado"        
      //}
      var CPF  = "18504473813";
      var criterio = "";
      var filtro = "";
      //Filtros: CPF, email, telefone, parte do nome
      if (req.body.CPF){
        CPF = req.body.CPF;
      }
      if (req.body.criterio){
        criterio = req.body.criterio;
      }

      //desativar o filtro por CPF, vamos receber apenas uma variavel
      //de acordo com o tamanho, aplicar o filtro.
      if (CPF != ""){
          filtro = " and ent_doc01 = '" + CPF + "'";
      }

      if (criterio !== ""){
        //Identificar padrao numérico
        var numbers = /^[0-9]+$/;
        if(criterio.match(numbers)){
          
          if (criterio.length == 11){
            filtro = " and ent_doc01 = '" + criterio + "'"; 
          }
          if (criterio.length == 14){
            filtro = " and ent_doc01 = '" + criterio + "'";
          }
          if (filtro== ""){
            filtro = " and ent_cod in (select tel_entidade from telefones where tel_numero = '" + criterio + "')"
          }

        } else {
           //Identificar texto
           if (criterio.indexOf('@') !== -1) {
            filtro = " and ent_email = '" + criterio + "'";
           } else {
            filtro = " and ent_nome like '%" + criterio + "%'";
           }
        }
      }  
        const modelo = [
            {
              codigo: 1,
              cartao: "123456",
              conta: "654321",
              produto: "Normal",
              nome: "Cadastro 1",
              documento: "11111111111",
              data_nascimento: "11/11/1111"
            },
            {
                codigo: 2,
                cartao: "123456",
                conta: "654321",
                produto: "Normal",
                nome: "Cadastro 1",
                documento: "11111111111",
                data_nascimento: "11/11/1111"
            },
            {
                codigo: 3,
                cartao: "123456",
                conta: "654321",
                produto: "Normal",
                nome: "Cadastro 1",
                documento: "11111111111",
                data_nascimento: "11/11/1111"
            },
            {
                codigo: 4,
                cartao: "123456",
                conta: "654321",
                produto: "Normal",
                nome: "Cadastro 1",
                documento: "11111111111",
                data_nascimento: "11/11/1111"
            },
            {
                codigo: 5,
                cartao: "123456",
                conta: "654321",
                produto: "Normal",
                nome: "Cadastro 1",
                documento: "11111111111",
                data_nascimento: "11/11/1111"
            }
          ]
          var connection = await connectionFactory();
          try{
            //Tirar o TOP 10 ao ir para produção
            var resultados = await connection.request().query("select top 10 ent_cod as codigo, car_cod_ext as cartao, con_cod_ext as conta, prc_descricao as produto,  ent_nome as nome, ent_doc01 as documento, FORMAT (ent_data_nasc, 'd', 'pt-BR' ) as data_nascimento from entidades, contas, cartoes, produtos_contas where ent_cod = con_entidade and con_cod = car_conta and con_produto = prc_cod " + filtro);
              return res.status(200).json(resultados.recordset);
          } catch(err){
              return res.status(500).json({status: 'erro', detalhes: err}); 
          }
    }    
    async acoes(req, res) {
       //http://localhost:3000/acoes/621
        const modelo = [{
            codigo: 1,
            acao: "nome da Ação",
            data_cadastro: "19/08/2019",
            data_atualizacao: "19/08/2019",
            status: "Aderiu"
          },
          {
            codigo: 2,
            acao: "nome da Ação",
            data_cadastro: "19/08/2019",
            data_atualizacao: "19/08/2019",
            status: "Aderiu"
          },
          {
            codigo: 3,
            acao: "nome da Ação",
            data_cadastro: "19/08/2019",
            data_atualizacao: "19/08/2019",
            status: "Aderiu"
          },
          {
            codigo: 4,
            acao: "nome da Ação",
            data_cadastro: "19/08/2019",
            data_atualizacao: "19/08/2019",
            status: "Aderiu"
          },
          {
            codigo: 5,
            acao: "nome da Ação",
            data_cadastro: "19/08/2019",
            data_atualizacao: "19/08/2019",
            status: "Aderiu"
          },
          {
            codigo: 6,
            acao: "nome da Ação",
            data_cadastro: "19/08/2019",
            data_atualizacao: "19/08/2019",
            status: "Aderiu"
          },
          {
            codigo: 7,
            acao: "nome da Ação",
            data_cadastro: "19/08/2019",
            data_atualizacao: "19/08/2019",
            status: "Aderiu"
          },
          {
            codigo: 8,
            acao: "nome da Ação",
            data_cadastro: "19/08/2019",
            data_atualizacao: "19/08/2019",
            status: "Aderiu"
          }]
         var entidade = 0;
         if (req.params.entidade){
           entidade = req.params.entidade;
         }
         var connection = await connectionFactory();
         try{
             var resultados = await connection.request().query("select coa_cod as codigo, aco_descricao as acao, FORMAT (coa_data_cad, 'dd/MM/yyyy HH:mm:ss')  as data_cadastro, FORMAT (coa_data_atu, 'dd/MM/yyyy HH:mm:ss') as data_atualizacao, cad_descricao as status from contas_acoes, acoes, cadastros_gerais where aco_cod = coa_acao and coa_status = cad_cod and coa_conta in (select con_cod from contas where con_entidade = " + entidade + ")");
             return res.status(200).json(resultados.recordset);
            } catch(err){
               return res.status(500).json({status: 'erro', detalhes: err}); 
            }
    }   
    async contatos(req, res) {
        //http://localhost:3000/contatos/625
        var entidade = 0;
        if (req.params.entidade){
          entidade = req.params.entidade;
        }
        const modelo = [
            {
              id: 1,
              email: "teste@teste.com.br",
              ddd: "11",
              telefone: "1111111111",
              tipo: "Elogio",
              mensagem:
               "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam sed pharetra diam. Donec pellentesque nisl sapien, eu porta purus cursus vel. Vivamus iaculis neque pretium, condimentum neque eu, pellentesque magna.",
              data: "19/08/2019"
            },
            {
              id: 2,
              email: "teste@teste.com.br",
              ddd: "11",
              telefone: "1111111111",
              tipo: "Elogio",
              mensagem:
                "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam sed pharetra diam. Donec pellentesque nisl sapien, eu porta purus cursus vel. Vivamus iaculis neque pretium, condimentum neque eu, pellentesque magna.",
              data: "19/08/2019"
            },
            {
              id: 3,
              email: "teste@teste.com.br",
              ddd: "11",
              telefone: "1111111111",
              tipo: "Elogio",
              mensagem:
                "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam sed pharetra diam. Donec pellentesque nisl sapien, eu porta purus cursus vel. Vivamus iaculis neque pretium, condimentum neque eu, pellentesque magna.",
              data: "19/08/2019"
            },
            {
              id: 4,
              email: "teste@teste.com.br",
              ddd: "11",
              telefone: "1111111111",
              tipo: "Elogio",
              mensagem: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam sed pharetra diam. Donec pellentesque nisl sapien, eu porta purus cursus vel. Vivamus iaculis neque pretium, condimentum neque eu, pellentesque magna.",
              data: "19/08/2019"
            },
            {
              id: 5,
              email: "teste@teste.com.br",
              ddd: "11",
              telefone: "1111111111",
              tipo: "Elogio",
              mensagem:
                "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam sed pharetra diam. Donec pellentesque nisl sapien, eu porta purus cursus vel. Vivamus iaculis neque pretium, condimentum neque eu, pellentesque magna.",
              data: "19/08/2019"
            }
          ]

          var connection = await connectionFactory();
          try{
              var resultados = await connection.request().query("select id, email, ddd, telefone, tipo, mensagem, FORMAT (data, 'dd/MM/yyyy HH:mm:ss') as data from contato where cpf in (select ent_doc01 from entidades where ent_cod = " + entidade + ")");
              return res.status(200).json(resultados.recordset);
             } catch(err){
                return res.status(500).json({status: 'erro', detalhes: err}); 
             }
    }   
    async historico(req, res) {
      //http://localhost:3000/historico/625
      var entidade = 0;
      if (req.params.entidade){
        entidade = req.params.entidade;
      }
        const modelo = [
            {
              codigo: 1,
              usuario: "Bins",
              data: "20/08/2019",
              motivo: "Somente Consulta",
              conteudo:
                "Some default panel content here. Nulla vitae elit libero, a pharetra augue. Aenean lacinia bibendum nulla sed consectetur. Aenean eu leo quam. Pellentesque ornare sem lacinia quam venenatis vestibulum. Nullam id dolor id nibh ultricies vehicula ut id elit."
            },
            {
              codigo: 2,
              usuario: "Bins",
              data: "20/08/2019",
              motivo: "Somente Consulta",
              conteudo:
                "Some default panel content here. Nulla vitae elit libero, a pharetra augue. Aenean lacinia bibendum nulla sed consectetur. Aenean eu leo quam. Pellentesque ornare sem lacinia quam venenatis vestibulum. Nullam id dolor id nibh ultricies vehicula ut id elit."
            },
            {
              codigo: 3,
              usuario: "Bins",
              data: "20/08/2019",
              motivo: "Somente Consulta",
              conteudo:
                "Some default panel content here. Nulla vitae elit libero, a pharetra augue. Aenean lacinia bibendum nulla sed consectetur. Aenean eu leo quam. Pellentesque ornare sem lacinia quam venenatis vestibulum. Nullam id dolor id nibh ultricies vehicula ut id elit."
            },
            {
              codigo: 4,
              usuario: "Bins",
              data: "20/08/2019",
              motivo: "Somente Consulta",
              conteudo:
                "Some default panel content here. Nulla vitae elit libero, a pharetra augue. Aenean lacinia bibendum nulla sed consectetur. Aenean eu leo quam. Pellentesque ornare sem lacinia quam venenatis vestibulum. Nullam id dolor id nibh ultricies vehicula ut id elit."
            },
            {
              codigo: 5,
              usuario: "Bins",
              data: "20/08/2019",
              motivo: "Somente Consulta",
              conteudo:
                "Some default panel content here. Nulla vitae elit libero, a pharetra augue. Aenean lacinia bibendum nulla sed consectetur. Aenean eu leo quam. Pellentesque ornare sem lacinia quam venenatis vestibulum. Nullam id dolor id nibh ultricies vehicula ut id elit."
            },
            {
              codigo: 6,
              usuario: "Bins",
              data: "20/08/2019",
              motivo: "Somente Consulta",
              conteudo:
                "Some default panel content here. Nulla vitae elit libero, a pharetra augue. Aenean lacinia bibendum nulla sed consectetur. Aenean eu leo quam. Pellentesque ornare sem lacinia quam venenatis vestibulum. Nullam id dolor id nibh ultricies vehicula ut id elit."
            },
            {
              codigo: 7,
              usuario: "Bins",
              data: "20/08/2019",
              motivo: "Somente Consulta",
              conteudo:
                "Some default panel content here. Nulla vitae elit libero, a pharetra augue. Aenean lacinia bibendum nulla sed consectetur. Aenean eu leo quam. Pellentesque ornare sem lacinia quam venenatis vestibulum. Nullam id dolor id nibh ultricies vehicula ut id elit."
            },
            {
              codigo: 8,
              usuario: "Bins",
              data: "20/08/2019",
              motivo: "Somente Consulta",
              conteudo:
                "Some default panel content here. Nulla vitae elit libero, a pharetra augue. Aenean lacinia bibendum nulla sed consectetur. Aenean eu leo quam. Pellentesque ornare sem lacinia quam venenatis vestibulum. Nullam id dolor id nibh ultricies vehicula ut id elit."
            }
          ]
          var connection = await connectionFactory();
          try{
              var resultados = await connection.request().query("select his_cod as codigo, usu_nome as usuario, FORMAT (his_data, 'dd/MM/yyyy HH:mm:ss') as data, his_texto as conteudo, cad_descricao as motivo from historicos, usuarios_sao, historicos_itens, cadastros_gerais where his_atendente = usu_cod and his_cod = hii_historico and hii_motivo = cad_cod and his_entidade = " + entidade + " order by his_cod desc");
              return res.status(200).json(resultados.recordset);
             } catch(err){
                return res.status(500).json({status: 'erro', detalhes: err}); 
             }
    }   
    async log(req, res) {
      //http://localhost:3000/log/625
      var entidade = 0;
      if (req.params.entidade){
        entidade = req.params.entidade;
      }
        const modelo = [
            {
              codigo: 1,
              data: "20/08/2019",
              tabela: "entidades",
              campo: "ent_status",
              de: "Inativo",
              para: "Ativo",
              alterado_por: "Bins"
            },
            {
              codigo: 2,
              data: "20/08/2019",
              tabela: "entidades",
              campo: "ent_status",
              de: "Inativo",
              para: "Ativo",
              alterado_por: "Bins"
            },
            {
              codigo: 3,
              data: "20/08/2019",
              tabela: "entidades",
              campo: "ent_status",
              de: "Inativo",
              para: "Ativo",
              alterado_por: "Bins"
            },
            {
              codigo: 4,
              data: "20/08/2019",
              tabela: "entidades",
              campo: "ent_status",
              de: "Inativo",
              para: "Ativo",
              alterado_por: "Bins"
            },
            {
              codigo: 5,
              data: "20/08/2019",
              tabela: "entidades",
              campo: "ent_status",
              de: "Inativo",
              para: "Ativo",
              alterado_por: "Bins"
            },
            {
              codigo: 6,
              data: "20/08/2019",
              tabela: "entidades",
              campo: "ent_status",
              de: "Inativo",
              para: "Ativo",
              alterado_por: "Bins"
            }
          ]
          var connection = await connectionFactory();
          //Refatorar a query para pegar enderecos e telefones
          var filtro = " and log_tabela = 'entidades' and log_chave = '" + entidade + "'";
          try{
              var resultados = await connection.request().query("select log_codigo as codigo, FORMAT (log_data, 'dd/MM/yyyy HH:mm:ss') as data, log_tabela as tabela, log_campo as campo, log_anterior as de, log_alterado as para,  usu_nome as alterado_por from log, usuarios_sao where log_usuario = usu_cod " + filtro);
              return res.status(200).json(resultados.recordset);
             } catch(err){
                return res.status(500).json({status: 'erro', detalhes: err}); 
             }
    }   
    async resgates(req, res) {
      //http://localhost:3000/resgates/621
      var entidade = 0;
      if (req.params.entidade){
        entidade = req.params.entidade;
      }
        const modelo = [
            {
              numero: 1,
              codigo_item: 1,
              tipo: "Troca",
              data: "19/08/2019",
              origem: "Central de Atendimento",
              codigo_produto: 1,
              descricao: "Bola Quadrada",
              pontos: 10000,
              qtde: 1,
              sem_pontos: "N",
              posta_restante: "N",
              agenda: "N",
              status: "Pendente",
              codigo_status: 841,
              nota_fiscal: "",
              envio: "",
              tipo_entrega: ""
            },
            {
              numero: 2,
              codigo_item: 2,
              tipo: "Troca",
              data: "19/08/2019",
              origem: "Aplicativo",
              codigo_produto: 1,
              descricao: "Bola Quadrada",
              pontos: 10000,
              qtde: 1,
              sem_pontos: "N",
              posta_restante: "N",
              agenda: "N",
              status: "Pendente",
              codigo_status: 841,
              nota_fiscal: "",
              envio: "",
              tipo_entrega: ""
            },
            {
              numero: 3,
              codigo_item: 3,
              tipo: "Troca",
              data: "19/08/2019",
              origem: "Site",
              codigo_produto: 1,
              descricao: "Bola Quadrada",
              pontos: 10000,
              qtde: 1,
              sem_pontos: "N",
              posta_restante: "N",
              agenda: "N",
              status: "Pendente",
              codigo_status: 841,
              nota_fiscal: "",
              envio: "",
              tipo_entrega: ""
            },
            {
              numero: 4,
              codigo_item: 4,
              tipo: "Troca",
              data: "19/08/2019",
              origem: "Central de Atendimento",
              codigo_produto: 1,
              descricao: "Bola Quadrada",
              pontos: 10000,
              qtde: 1,
              sem_pontos: "N",
              posta_restante: "N",
              agenda: "N",
              status: "Pendente",
              codigo_status: 841,
              nota_fiscal: "",
              envio: "",
              tipo_entrega: ""
            }
          ]
          var connection = await connectionFactory();
          try{
              var resultados = await connection.request().query("SELECT tra_cod as numero, FORMAT (tra_data, 'dd/MM/yyyy HH:mm:ss')  as data, CG2.cad_descricao as origem, tra_par02_texto as sem_pontos, tra_par01_texto as posta_restante, tri_cod as codigo_item, tri_quantidade as qtde, pro_descricao as descricao, pro_cod_ext1 as codigo_produto, tri_valor as pontos, tri_status as codigo_status,  cadastros_gerais.cad_descricao AS status, cadastros_gerais_1.cad_descricao AS tipo, 'N' as agenda, '' as nota_fiscal, '' as envio, '' as tipo_entrega  FROM cadastros_gerais AS cadastros_gerais_1 INNER JOIN  transacoes ON cadastros_gerais_1.cad_cod = tra_tipo LEFT OUTER JOIN  entidades INNER JOIN  contas ON entidades.ent_cod = con_entidade INNER JOIN transacoes_itens ON con_cod = tri_conta INNER JOIN produtos ON tri_produto = pro_cod INNER JOIN cadastros_gerais ON tri_status = cad_cod ON tra_cod = tri_transacao INNER JOIN cadastros_gerais AS CG2 ON tra_origem = CG2.cad_cod WHERE (tra_tipo IN (678, 22080)) and ent_cod = " + entidade + " ORDER BY tri_transacao desc");
              return res.status(200).json(resultados.recordset);
             } catch(err){
                return res.status(500).json({status: 'erro', detalhes: err}); 
             }
    }   
    async sms(req, res) {
      //http://localhost:3000/sms/625
      var entidade = 0;
      if (req.params.entidade){
        entidade = req.params.entidade;
      }
        const modelo =[
            {
              id: 1,
              tipo: "Envio",
              celular: "111111111111",
              status: "enviado",
              data: "19/08/2019",
              mensagem: "Mensagem do SMS"
            },
            {
              id: 2,
              tipo: "Envio",
              celular: "111111111111",
              status: "enviado",
              data: "19/08/2019",
              mensagem: "Mensagem do SMS"
            },
            {
              id: 3,
              tipo: "Envio",
              celular: "111111111111",
              status: "enviado",
              data: "19/08/2019",
              mensagem: "Mensagem do SMS"
            },
            {
              id: 4,
              tipo: "Envio",
              celular: "111111111111",
              status: "enviado",
              data: "19/08/2019",
              mensagem: "Mensagem do SMS"
            },
            {
              id: 5,
              tipo: "Envio",
              celular: "111111111111",
              status: "enviado",
              data: "19/08/2019",
              mensagem: "Mensagem do SMS"
            },
            {
              id: 6,
              tipo: "Envio",
              celular: "111111111111",
              status: "enviado",
              data: "19/08/2019",
              mensagem: "Mensagem do SMS"
            }
          ]
          //Refatorar, precisa marcar as mensagens recebidas
          var connection = await connectionFactory();
          try{
                var resultados = await connection.request().query("select seunum as codigo, 'Envio' as tipo, celular, status, FORMAT (datapost, 'dd/MM/yyyy HH:mm:ss') as data, mensagem from tb_cob_sms where ent_cod = " + entidade);
              return res.status(200).json(resultados.recordset);
             } catch(err){
                return res.status(500).json({status: 'erro', detalhes: err}); 
             }
    }   
    async endereco(req, res) {
      //http://localhost:3000/endereco/625
      var entidade = 0;
      if (req.params.entidade){
        entidade = req.params.entidade;
      }
      
        const modelo = [
            {
              codigo: 1,
              tipo: "Residencial",
              endereco: "Rua teste",
              numero: "10",
              complemento: "Teste",
              bairro: "Bairro teste",
              cidade: "SÃO PAULO",
              estado: "SP",
              CEP: "00000000",
              data_cadastro: "20/08/2019",
              data_atualizacao: "20/08/2019",
              excluido: "N"
            },
            {
              codigo: 2,
              tipo: "Comercial",
              endereco: "Rua teste",
              numero: "10",
              complemento: "Teste",
              bairro: "Bairro teste",
              cidade: "SÃO PAULO",
              estado: "SP",
              CEP: "00000000",
              data_cadastro: "20/08/2019",
              data_atualizacao: "20/08/2019",
              excluido: "N"
            },
            {
              codigo: 3,
              tipo: "Contato",
              endereco: "Rua teste",
              numero: "10",
              complemento: "Teste",
              bairro: "Bairro teste",
              cidade: "SÃO PAULO",
              estado: "SP",
              CEP: "00000000",
              data_cadastro: "20/08/2019",
              data_atualizacao: "20/08/2019",
              excluido: "N"
            }
          ]
          var connection = await connectionFactory();
          try{
              var resultados = await connection.request().query("select end_cod as codigo, cad_descricao as tipo, end_rua as endereco, end_numero as numero, end_compl as complemento, end_bairro as bairro, end_cidade as cidade, end_estado as estado, end_cep as CEP,  FORMAT (end_data_cad, 'dd/MM/yyyy HH:mm:ss')  as data_cadastro, FORMAT (end_data_atu, 'dd/MM/yyyy HH:mm:ss')  as data_atualizacao, end_excluido as excluido  from enderecos, cadastros_gerais where end_tipo = cad_cod and end_entidade = " + entidade);
              return res.status(200).json(resultados.recordset);
             } catch(err){
                return res.status(500).json({status: 'erro', detalhes: err}); 
             }
    }   
    async telefone(req, res) {
      //http://localhost:3000/telefone/625
      var entidade = 0;
      if (req.params.entidade){
        entidade = req.params.entidade;
      }
        const modelo =[
            {
              codigo: 1,
              tipo: "Residencial",
              ddd: "11",
              telefone: "11111111",
              data_cadastro: "20/08/2019",
              data_atualizacao: "20/08/2019",
              excluido: "N"
            },
            {
              codigo: 2,
              tipo: "Comercial",
              ddd: "11",
              telefone: "11111111",
              data_cadastro: "20/08/2019",
              data_atualizacao: "20/08/2019",
              excluido: "N"
            },
            {
              codigo: 3,
              tipo: "Celular",
              ddd: "11",
              telefone: "11111111",
              data_cadastro: "20/08/2019",
              data_atualizacao: "20/08/2019",
              excluido: "N"
            }
          ]
          var connection = await connectionFactory();
          try{
              var resultados = await connection.request().query("select tel_cod as codigo, cad_descricao as tipo, tel_ddd as ddd, tel_numero as telefone, FORMAT (tel_data_cad, 'dd/MM/yyyy HH:mm:ss')  as data_cadastro, FORMAT (tel_data_atu, 'dd/MM/yyyy HH:mm:ss')  as data_atualizacao, tel_excluido as excluido  from telefones, cadastros_gerais where tel_tipo = cad_cod and tel_entidade = " + entidade);
              return res.status(200).json(resultados.recordset);
             } catch(err){
                return res.status(500).json({status: 'erro', detalhes: err}); 
             }
    }   

    //As rotas a seguinr não foram testadas!
    async endereco_inserir(req, res) {
      //request
      //{
      //  "tipo":2723,
      //  "entidade":625,
      //  "rua":"AV SAO GUALTER",
      //  "numero":"596",
      //  "compl":"TI",
      //  "cep":"05455000",
      //  "bairro":"VILA IDA",
      //  "cidade":"SAO PAULO",
      //  "estado":"SP"
      //  }
      var retorno =  { codigo:1};
      var StrSQL = "";
      
      var tipo  = 0;
      var entidade  = 0;
      var rua  = "";
      var numero  = "";
      var compl  = "";
      var cep   = "";
      var bairro  = "";
      var cidade  = "";
      var estado  = "";
  
      if (req.body.tipo){
        tipo = req.body.tipo;
      }
      if (req.body.entidade){
        entidade = req.body.entidade;
      }
      if (req.body.rua){
        rua = req.body.rua;
      }
      if (req.body.numero){
        numero = req.body.numero;
      }
      if (req.body.compl){
        compl = req.body.compl;
      }
      if (req.body.cep){
        cep = req.body.cep;
      }
      if (req.body.bairro){
        bairro = req.body.bairro;
      }
      if (req.body.cidade){
        cidade = req.body.cidade;
      }
      if (req.body.estado){
        estado = req.body.estado;
      }
  
      var connection = await connectionFactory();
      StrSQL = "UPDATE enderecos SET end_excluido = 'S' where end_tipo = " + tipo + " and end_entidade = " + entidade; 
      let resultados = await connection.request().query(StrSQL);
  
      StrSQL = "INSERT INTO enderecos (end_tipo, end_entidade, end_rua, end_numero, end_compl, end_cep, end_bairro, end_cidade, end_estado, end_excluido, end_data_cad)";
      StrSQL += "VALUES (" + tipo + ", " + entidade + " , '" + rua + "', '" + numero + "', '" + compl + "', '" + cep + "', '" + bairro + "', '" + cidade + "', '" + estado + "', 'N', convert(datetime, getdate(), 103))";
      let resultados2 = await connection.request().query(StrSQL);
  
      return res.status(200).json(retorno);
    }
  
    async telefone_inserir(req, res) {
      //request
      //{
      //  "tipo":8200,
      //    "entidade":625,
      //    "ddd":"11",
      //    "telefone":"12345678"
      //}
      var retorno =  { codigo:1};
      var StrSQL = "";
      var tipo  = 0;
      var entidade  = 0;
      var ddd = 0;
      var telefone = 0;
  
      if (req.body.tipo){
        tipo = req.body.tipo;
      }
      if (req.body.entidade){
        entidade = req.body.entidade;
      }
      if (req.body.ddd){
        ddd = req.body.ddd;
      }
      if (req.body.telefone){
        telefone = req.body.telefone;
      }
  
      var connection = await connectionFactory();
      StrSQL = "UPDATE telefones SET tel_excluido = 'S' where tel_tipo = " + tipo + " and tel_entidade = " + entidade; 
      let resultados = await connection.request().query(StrSQL);
  
      StrSQL = "INSERT INTO telefones (tel_tipo, tel_entidade, tel_ddd, tel_numero, tel_excluido, tel_data_cad)";
      StrSQL += "VALUES (" + tipo + ", " + entidade + ", " + ddd +", " +  telefone +", 'N', convert(datetime, getdate(), 103))";
      let resultados2 = await connection.request().query(StrSQL);
      return res.status(200).json(retorno);
    }

    async entidade_atualizar(req, res) {
      var retorno =  { codigo:0};
      var StrSQL = "";
      const {codigo, nome, email, email_capturado, profissao, sexo, estado_civil, data_nascimento, status} = req.body
      if (codigo){
        StrSQL = "UPDATE entidades SET ent_data_nasc = convert(datetime, '" + data_nascimento + "', 103), ent_estado_civil = " + estado_civil + ", ent_sexo = " + sexo + ", ent_status = " + status + ",  ent_nome = '" + nome + "', ent_email = '" + email + "', ent_email_capt = '" + email_capturado + "', ent_profissao = '" + profissao + "' where ent_cod = " + codigo;
        //let resultados = await connection.request().query(StrSQL);
      }
      var connection = await connectionFactory();
      return res.status(200).json(retorno);
    }
  

  }
  
  export default new CadastroController();