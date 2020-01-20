import { IncomingMessage } from 'http';

var connectionFactory = require('../../database.js');

class OcorrenciasController {

    async ocorrencias(req, res) {
        //Apenas a entidade foi testada!
        //{
        //  "entidade": 0,
        //  "status": "",
        //  "todas": "",
        //  "usuario": "",
        //  "ocorrencia": "",
        //  "assunto":"",
        //  "aberta": "",
        //  "encaminhada":"",
        //  "dataInicio":"",
        //  "dataFim":""
        //}

         //usada pela tela de localizar ocorrencias ou pela tela de ocorrencia do participante
        //http://localhost:3000/ocorrencias
        //request
        //{
        //  "entidade": 0,
        //    "status": 68,
        //    "todas": "",
        //    "usuario": "",
        //    "ocorrencia": "",
        //    "assunto": "",
        //    "aberta": "",
        //    "encaminhada": "",
        //    "dataInicio": "",
        //    "dataFim": ""
        //}
        var entidade = 0;
        var status = 0;
        var todas = "";
        var usuario = "";
        var ocorrencia = "";
        var assunto = "";
        var aberta = "";
        var encaminhada = "";
        var dataInicio = "";
        var dataFim = "";
        var filtro = "";
        if (req.body.entidade){
          entidade = req.body.entidade;
        }
        if (req.body.status){
          status = req.body.status;
        }
        if (req.body.todas){
          todas = req.body.todas;
        }
        if (req.body.usuario){
          usuario = req.body.usuario;
        }
        if (req.body.ocorrencia){
          ocorrencia = req.body.ocorrencia;
        }
        if (req.body.assunto){
          assunto = req.body.assunto;
        }
        if (req.body.aberta){
          aberta = req.body.aberta;
        }
        if (req.body.dataInicio){
          dataInicio = req.body.dataInicio;
        }
        if (req.body.dataFim){
          dataFim = req.body.dataFim;
        }
        if (req.body.encaminhada){
          encaminhada = req.body.encaminhada;
        }
        if (entidade == 0){
          //Nao tem filtro
        } else {
          filtro += " and O.oco_entidade = " + entidade;
        }

        if (status !== 0){
          if (status!== ""){
            if (status !== 999){
              filtro += " and O.oco_cod in (select oci_ocorrencia from ocorrencias_itens where oci_cod in (select max(oci_cod) as codigo from ocorrencias_itens group by oci_ocorrencia) and oci_status = " + status  + ")";
            } else {
                //Filtrar tudo o que NÃO estiver encerrado
                filtro += " and O.oco_encerrada is not NULL";
            }
          }
        }

        if (todas == ""){
          if (usuario !==""){
            if (ocorrencia===""){
              filtro += " and O.oco_cod in (select oci_ocorrencia from ocorrencias_itens where oci_cod in (select max(oci_cod) as codigo from ocorrencias_itens group by oci_ocorrencia) and oci_status = " + usuario  + ")";
            }	
          }
        }

        //Receber datas no formado YYYY-MM-DD
        if (dataInicio!==""){
          if (dataFim !== ""){
            filtro += " and O.oco_data_aber BETWEEN '" + dataInicio + " 00:00:00' AND '" + dataFim + " 23:59:59' ";
          }
        }


        if (ocorrencia!==""){
          filtro += " and  O.oco_cod = '" + ocorrencia + "' " ;
        }

        
        if (assunto!==""){
          filtro += " and O.oco_assunto = " + assunto;
        }

        if (aberta !== ""){
          if (aberta !== "Todos"){
            filtro += " and O.oco_aberta = " + aberta;
          }
        }

        if (encaminhada !== "") {
          if (encaminhada !== "Todos"){
            filtro += " and O.oco_cod in (select oci_ocorrencia from ocorrencias_itens where oci_cod in (select max(oci_cod) as codigo from ocorrencias_itens group by oci_ocorrencia) and oci_encaminhada = " + encaminhada  + ")";
          }
        }


        const modelo = [
            {
              numero: 10,
              abertura: "19/08/2019",
              assunto: "Entrega de Brinde",
              aberta_por: "Bins",
              encaminhada_para: "Daniel Bins",
              cliente: "Asterix",
              codigo_cliente: 10,
              CPF: "11111111111",
              status: "Pendente",
              encerrada: "",
              CNPJ_Loja: "00000000000000",
              ultima_interacao: "19/08/2019",
              qtde_de_dias: 1
            },
            {
              numero: 10,
              abertura: "19/08/2019",
              assunto: "Entrega de Brinde",
              aberta_por: "Bins",
              encaminhada_para: "Daniel Bins",
              cliente: "Asterix",
              codigo_cliente: 10,
              CPF: "11111111111",
              status: "Pendente",
              encerrada: "",
              CNPJ_Loja: "00000000000000",
              ultima_interacao: "19/08/2019",
              qtde_de_dias: 1
            },
            {
              numero: 10,
              abertura: "19/08/2019",
              assunto: "Entrega de Brinde",
              aberta_por: "Bins",
              encaminhada_para: "Daniel Bins",
              cliente: "Asterix",
              codigo_cliente: 10,
              CPF: "11111111111",
              status: "Pendente",
              encerrada: "",
              CNPJ_Loja: "00000000000000",
              ultima_interacao: "19/08/2019",
              qtde_de_dias: 1
            },
            {
              numero: 10,
              abertura: "19/08/2019",
              assunto: "Entrega de Brinde",
              aberta_por: "Bins",
              encaminhada_para: "Daniel Bins",
              cliente: "Asterix",
              codigo_cliente: 10,
              CPF: "11111111111",
              status: "Pendente",
              encerrada: "",
              CNPJ_Loja: "00000000000000",
              ultima_interacao: "19/08/2019",
              qtde_de_dias: 1
            },
            {
              numero: 10,
              abertura: "19/08/2019",
              assunto: "Entrega de Brinde",
              aberta_por: "Bins",
              encaminhada_para: "Daniel Bins",
              cliente: "Asterix",
              codigo_cliente: 10,
              CPF: "11111111111",
              status: "Pendente",
              encerrada: "",
              CNPJ_Loja: "00000000000000",
              ultima_interacao: "19/08/2019",
              qtde_de_dias: 1
            },
            {
              numero: 10,
              abertura: "19/08/2019",
              assunto: "Entrega de Brinde",
              aberta_por: "Bins",
              encaminhada_para: "Daniel Bins",
              cliente: "Asterix",
              codigo_cliente: 10,
              CPF: "11111111111",
              status: "Pendente",
              encerrada: "",
              CNPJ_Loja: "00000000000000",
              ultima_interacao: "19/08/2019",
              qtde_de_dias: 1
            },
            {
              numero: 10,
              abertura: "19/08/2019",
              assunto: "Entrega de Brinde",
              aberta_por: "Bins",
              encaminhada_para: "Daniel Bins",
              cliente: "Asterix",
              codigo_cliente: 10,
              CPF: "11111111111",
              status: "Pendente",
              encerrada: "",
              CNPJ_Loja: "00000000000000",
              ultima_interacao: "19/08/2019",
              qtde_de_dias: 1
            },
            {
              numero: 10,
              abertura: "19/08/2019",
              assunto: "Entrega de Brinde",
              aberta_por: "Bins",
              encaminhada_para: "Daniel Bins",
              cliente: "Asterix",
              codigo_cliente: 10,
              CPF: "11111111111",
              status: "Pendente",
              encerrada: "",
              CNPJ_Loja: "00000000000000",
              ultima_interacao: "19/08/2019",
              qtde_de_dias: 1
            }
          ];
          var connection = await connectionFactory();
          try{
              var StrSQL = "select TOP 10  oco_cod as numero, FORMAT (oco_data_aber, 'dd/MM/yyyy HH:mm:ss') as abertura, FORMAT (oco_data_encer, 'dd/MM/yyyy HH:mm:ss') as encerrada, cad_descricao as assunto, usu_nome as aberta_por,ent_nome as cliente, (select top 1 usu_nome from usuarios_sao, ocorrencias_itens where usu_cod = oci_encaminhada and oci_ocorrencia = O.oco_cod order by oci_cod desc) as encaminhada_para, (select top 1 cad_descricao from cadastros_gerais, ocorrencias_itens where cad_cod = oci_status and oci_ocorrencia = O.oco_cod order by oci_cod desc) as status, ent_cod as codigo_cliente,  ent_doc01 as CPF, '' as CNPJ_Loja, (select top 1 oci_data from ocorrencias_itens where oci_ocorrencia = O.oco_cod order by oci_cod desc) as ultima_interacao, (select top 1 DATEDIFF(day, oci_data, getdate())  from ocorrencias_itens where oci_ocorrencia = O.oco_cod order by oci_cod desc) as qtde_de_dias from ocorrencias as O, entidades, usuarios_sao, cadastros_gerais where O.oco_entidade = ent_cod and O.oco_aberta = usu_cod and O.oco_assunto = cad_cod " + filtro + " ORDER BY oco_data_aber DESC";
              var resultados = await connection.request().query(StrSQL);
              return res.status(200).json(resultados.recordset);
             } catch(err){
                return res.status(500).json({status: 'erro', detalhes: err}); 
             }
    }  
    async ocorrencias_assunto(req, res) {
		var tipo = 0;
        const resultado = [
            { codigo: 1, titulo: "Assunto 1" },
            { codigo: 2, titulo: "Assunto 2" },
            { codigo: 3, titulo: "Assunto 3" },
            { codigo: 4, titulo: "Assunto 4" },
            { codigo: 5, titulo: "Assunto 5" },
            { codigo: 6, titulo: "Assunto 6" },
            { codigo: 7, titulo: "Assunto 7" }
          ];
		  if (req.params.tipo){
			  tipo = req.params.tipo;
		  }
		  var filtro = " and cad_tipo = " +  tipo;
		  if (tipo == 9999){
			  filtro = " and cad_tipo in (select cad_cod from cadastros_gerais where cad_tipo = 571)";
		  }
		  
          //OBSERVACAO - FILTRAR PELO TIPO SELECIONADO
          var connection = await connectionFactory();
          try{
              var resultados = await connection.request().query("select cad_cod as codigo, cad_descricao as titulo from cadastros_gerais where cad_ativo = 1 " +  filtro + " order by cad_descricao");
              return res.status(200).json(resultados.recordset);
             } catch(err){
                return res.status(500).json({status: 'erro', detalhes: err}); 
             }
    }  
    async ocorrencias_status(req, res) {
        const modelo = [
            { codigo: 1, titulo: "Status 1" },
            { codigo: 2, titulo: "Status 2" },
            { codigo: 3, titulo: "Status 3" },
            { codigo: 4, titulo: "Status 4" },
            { codigo: 5, titulo: "Status 5" },
            { codigo: 6, titulo: "Status 6" },
            { codigo: 7, titulo: "Status 7" }
          ];
          var connection = await connectionFactory();
          try{
            var resultados = await connection.request().query("select cad_cod as codigo, cad_descricao as titulo from cadastros_gerais where cad_tipo = 65 and cad_ativo = 1 order by cad_descricao");
            return res.status(200).json(resultados.recordset);
           } catch(err){
              return res.status(500).json({status: 'erro', detalhes: err}); 
           }
    }  
    async ocorrenciasEncaminhada(req, res) {
        const modelo = [
            { codigo: 1, titulo: "Usuário 1" },
            { codigo: 2, titulo: "Usuário 2" },
            { codigo: 3, titulo: "Usuário 3" },
            { codigo: 4, titulo: "Usuário 4" },
            { codigo: 5, titulo: "Usuário 5" },
            { codigo: 6, titulo: "Usuário 6" },
            { codigo: 7, titulo: "Usuário 7" }
          ];
          var connection = await connectionFactory();
          try{
            var resultados = await connection.request().query("SELECT usu_cod as codigo, usu_nome as titulo from usuarios_sao where usu_ativo = 1 order by usu_nome");
            return res.status(200).json(resultados.recordset);
           } catch(err){
              return res.status(500).json({status: 'erro', detalhes: err}); 
           }
    }  
    async ocorrencias_tipo(req, res) {
        const modelo = [
            { codigo: 1, titulo: "Ações" },
            { codigo: 2, titulo: "Alteração de Cadastro" },
            { codigo: 3, titulo: "Elogio" },
            { codigo: 4, titulo: "Exceção" },
            { codigo: 5, titulo: "Informação" },
            { codigo: 6, titulo: "Reclamação" },
            { codigo: 7, titulo: "Solicitação" },
            { codigo: 8, titulo: "Sugestão" }
          ];
          var connection = await connectionFactory();
          try{
              var resultados = await connection.request().query("select cad_cod as codigo, cad_descricao as titulo from cadastros_gerais where cad_tipo = 571 and cad_ativo = 1 order by cad_descricao");
              return res.status(200).json(resultados.recordset);
             } catch(err){
                return res.status(500).json({status: 'erro', detalhes: err}); 
             }
    }  
    async ocorrencias_total(req, res) {
        //OBS: FILTRAR POR OPERADOR
         var StrSQL = "";
         var usuario = 0;
		 if (req.params.usuario){
			 usuario = req.params.usuario;
		 }
         var resultados2 = "";
         var resultado =  {
            pendentes: 0,
            encerradas: 0,
            total: 0,
            pendentes24h: 0,
            pendentes72h: 0,
            pendentesacima72: 0
          };

        var connection = await connectionFactory();
        StrSQL="SELECT count(oco_cod) as Total_Aberta from VW_UltimoItemOcorrencia Where cod_encaminhada = " + usuario + " and Status <> 'Encerrada'";
        resultados2 = await connection.request().query(StrSQL);
        resultados2.recordset.forEach(function(item) {
          resultado.pendentes = item.Total_Aberta;
        });
        StrSQL="select count(oco_cod) as Total_Encerrada from VW_UltimoItemOcorrencia Where Status = 'Encerrada' AND (cod_encaminhada = " + usuario + ")";
        resultados2 = await connection.request().query(StrSQL);
        resultados2.recordset.forEach(function(item) {
          resultado.encerradas = item.Total_Encerrada;
        });
        StrSQL="Select count(oco_cod) as Total_Geral from VW_UltimoItemOcorrencia Where cod_encaminhada = " + usuario;
        resultados2 = await connection.request().query(StrSQL);
        resultados2.recordset.forEach(function(item) {
          resultado.total = item.Total_Geral;
        });
        StrSQL="select count(oco_cod) as Total_Encaminhada_ate24hs from VW_UltimoItemOcorrencia Where cod_encaminhada = " + usuario + " and Status <> 'Encerrada' and oco_data_aber >= DATEADD (d , -1 , GETDATE())";
        resultados2 = await connection.request().query(StrSQL);
        resultados2.recordset.forEach(function(item) {
          resultado.pendentes24h = item.Total_Encaminhada_ate24hs;
        });
        StrSQL="select count(oco_cod) as Total_Encaminhada_ate48hs from VW_UltimoItemOcorrencia Where cod_encaminhada = " + usuario + " and Status <> 'Encerrada' and (oco_data_aber > DATEADD (d , -2 , GETDATE()) and oco_data_aber <= DATEADD (d , -1 , GETDATE()))";
        resultados2 = await connection.request().query(StrSQL);
        resultados2.recordset.forEach(function(item) {
          resultado.pendentes72h = item.Total_Encaminhada_ate48hs;
        });
        StrSQL="select count(oco_cod) as Total_Encaminhada_apos48hs from VW_UltimoItemOcorrencia Where cod_encaminhada = " + usuario + " and Status <> 'Encerrada' and oco_data_aber <= DATEADD (d , -2 , GETDATE())";
        resultados2 = await connection.request().query(StrSQL);
        resultados2.recordset.forEach(function(item) {
          resultado.pendentesacima72 = item.Total_Encaminhada_apos48hs;
        });
        return res.status(200).json(resultado);
    }  
    async ocorrencia(req, res) {
        //http://localhost:3000/ocorrencia/7966
        var codigo = 0;
        if (req.params.codigo){
          codigo = req.params.codigo;
        }
        const modelo = {
            numero: 1,
            tipo: 1,
            cliente: "Bins",
            codigo_cliente: 1,
            CPF: "11111111111",
            telefone: "(11)1111-1111",
            assunto: 1,
            status: 1,
            encaminhar: 1,
            data: 1,
            usuario: "Bins",
            codigo_usuario: 1,
            historico: [
              {
                data: "19/08/2019",
                usuario: "Bins",
                resposta:
                  "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce ac ultrices nibh, at dictum quam. In sagittis, mauris nec dapibus varius, elit diam porta massa, ac pretium massa dui at est. Nullam suscipit rhoncus nisi sed lacinia. Morbi at ipsum sed tellus porta bibendum ac sit amet eros."
              },
              {
                data: "19/08/2019",
                usuario: "Bins",
                resposta:
                  "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce ac ultrices nibh, at dictum quam. In sagittis, mauris nec dapibus varius, elit diam porta massa, ac pretium massa dui at est. Nullam suscipit rhoncus nisi sed lacinia. Morbi at ipsum sed tellus porta bibendum ac sit amet eros."
              },
              {
                data: "19/08/2019",
                usuario: "Bins",
                resposta:
                  "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce ac ultrices nibh, at dictum quam. In sagittis, mauris nec dapibus varius, elit diam porta massa, ac pretium massa dui at est. Nullam suscipit rhoncus nisi sed lacinia. Morbi at ipsum sed tellus porta bibendum ac sit amet eros."
              },
              {
                data: "19/08/2019",
                usuario: "Bins",
                resposta:
                  "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce ac ultrices nibh, at dictum quam. In sagittis, mauris nec dapibus varius, elit diam porta massa, ac pretium massa dui at est. Nullam suscipit rhoncus nisi sed lacinia. Morbi at ipsum sed tellus porta bibendum ac sit amet eros."
              },
              {
                data: "19/08/2019",
                usuario: "Bins",
                resposta:
                  "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce ac ultrices nibh, at dictum quam. In sagittis, mauris nec dapibus varius, elit diam porta massa, ac pretium massa dui at est. Nullam suscipit rhoncus nisi sed lacinia. Morbi at ipsum sed tellus porta bibendum ac sit amet eros."
              }
            ]
          };
          var retorno = [];  
          var connection = await connectionFactory();
          try{
            var resultados = await connection.request().query("SELECT TOP 1 oco_cod as numero, oco_tipo as tipo, oco_assunto as assunto,  ent_nome as cliente, ent_cod as codigo_cliente, ent_doc01 as CPF, usu_nome as usuario, usu_cod as codigo_usuario, FORMAT (oco_data_aber, 'dd/MM/yyyy HH:mm:ss')  as data, (select TOP 1 CONCAT('(', tel_ddd, ') ', tel_numero) from telefones where tel_excluido <> 'S' and tel_entidade = E.ent_cod ORDER BY tel_cod desc) as telefone, (select top 1 oci_status from ocorrencias_itens where oci_ocorrencia = O.oco_cod order by oci_cod desc) as status, (select top 1 oci_encaminhada from ocorrencias_itens where oci_ocorrencia = O.oco_cod order by oci_cod desc) as encaminhar, cad_descricao as departamento from ocorrencias as O, entidades as E, usuarios_sao, cadastros_gerais where O.oco_entidade = E.ent_cod and O.oco_aberta = usu_cod and usu_departamento = cad_cod and oco_cod =" + codigo);
            resultados.recordset.forEach(function(item) {
                var tmp = {
                  numero: item.numero,
                  tipo: item.tipo,
                  cliente: item.cliente,
                  codigo_cliente: item.codigo_cliente,
                  CPF: item.CPF,
                  telefone: item.telefone,
                  assunto: item.assunto,
                  status: item.status,
                  encaminhar: item.encaminhar,
                  data: item.data,
                  usuario: item.usuario,
                  codigo_usuario: item.codigo_usuario,
                };
                retorno.push(tmp);
            });

            for (var index = 0; index < retorno.length; index++) { 
              var tmp_array_motivos = [];
              var codigo = retorno[index].numero;
              var resultados2 = await connection.request().query("select FORMAT (oci_data, 'dd/MM/yyyy HH:mm:ss') as data, usu_nome as usuario, oci_texto as resposta from ocorrencias_itens, usuarios_sao where oci_encaminhada = usu_cod and oci_ocorrencia = " + codigo +  " order by oci_cod DESC");
              resultados2.recordset.forEach(function(item2) {
                var tmp2 = {
                  data: item2.data,
                  usuario: item2.usuario,
                  resposta:item2.resposta
                };
                tmp_array_motivos.push(tmp2);
              });
              retorno[index].historico = tmp_array_motivos;
            };
            return res.status(200).json(retorno);
          } catch(err){
            console.log(err);
            return res.status(500).json({status: 'erro', detalhes: err}); 
          }  
    }  

    async ocorrencia_gravar(req, res) {
      //request
      //{
      //  "cliente":625,
      //    "tipo":2666,
      //    "assunto":2667,
      //    "atendente":10,
      //    "status":66,
      //    "solicitada":10,
      //    "encaminhada":10,
      //    "texto":"TESTE"
      //}
      var retorno =  { codigo:0};
      var StrSQL = "";
      var novo_codigo = 0;
      
      var cliente = 0;
      var tipo = 0;
      var assunto = 0;
      var atendente = 0;
      var status  = 0;
      var solicitada = 0;
      var encaminhada = 0;
      var texto = "";
  
      if (req.body.cliente){
        cliente = req.body.cliente;
      }
      if (req.body.tipo){
        tipo = req.body.tipo;
      }
      if (req.body.atendente){
        atendente = req.body.atendente;
      }
      if (req.body.status){
        status = req.body.status;
      }
      if (req.body.solicitada){
        solicitada = req.body.solicitada;
      }
      if (req.body.encaminhada){
        encaminhada = req.body.encaminhada;
      }
      if (req.body.assunto){
        assunto = req.body.assunto;
      }
      if (req.body.texto){
        texto = req.body.texto;
      }
  
  
      var connection = await connectionFactory();
      StrSQL="INSERT INTO ocorrencias (oco_entidade, oco_tipo, oco_assunto, oco_aberta, oco_data_aber) VALUES (" + cliente + "," + tipo + "," + assunto + "," + atendente + ", convert(datetime, getdate(), 103))";
	  console.log(StrSQL);
      let resultados = await connection.request().query(StrSQL);
  
      StrSQL="SELECT max(oco_cod) as ultimo_codigo from ocorrencias where oco_entidade = " + cliente;
      let resultados2 = await connection.request().query(StrSQL);
      resultados2.recordset.forEach(function(item) {
        novo_codigo = item.ultimo_codigo;
      });
	  
	 try {	  
		  StrSQL="INSERT INTO ocorrencias_itens (oci_ocorrencia, oci_data, oci_status, oci_solicitada, oci_encaminhada, oci_texto) VALUES (" + novo_codigo + ", convert(datetime, getdate(), 103)," + status + "," + solicitada + "," + encaminhada + ",'" + texto + "')";
		  let resultados3 = await connection.request().query(StrSQL);
		  
		  if (status == 68){
			StrSQL="UPDATE ocorrencias SET oco_encerrada = "  + atendente + ", oco_data_encer = convert(datetime, getdate(), 103) WHERE oco_cod = " + novo_codigo;
			let resultados4 = await connection.request().query(StrSQL);
		  }
		  retorno.codigo = novo_codigo;
	  } catch(err){
          console.log(err);
          return res.status(500).json({status: 'erro', detalhes: err}); 
      }  
      return res.status(200).json(retorno);
    }
  
    async ocorrencia_item_gravar(req, res) {
      //request
      //{
      //  "ocorrencia":7972,
      //    "tipo":2666,
      //    "atendente":10,
      //    "status":68,
      //    "encaminhada":10,
      //    "texto":"FIM"
      //}
      var retorno =  { codigo:1};
      var StrSQL = "";
      var ocorrencia = 0;
      var status = 0;
      var atendente = 0;
      var encaminhada = 0;
      var texto = 0;
  
      if (req.body.ocorrencia){
        ocorrencia = req.body.ocorrencia;
      }
      if (req.body.status){
        status = req.body.status;
      }
      if (req.body.atendente){
        atendente = req.body.atendente;
      }
      if (req.body.encaminhada){
        encaminhada = req.body.encaminhada;
      }
      if (req.body.texto){
        texto = req.body.texto;
      }
  
      var connection = await connectionFactory();
      StrSQL="INSERT INTO ocorrencias_itens (oci_ocorrencia, oci_data, oci_status, oci_solicitada, oci_encaminhada, oci_texto) VALUES (" + ocorrencia + ",convert(datetime, getdate(), 103)," + status + "," + atendente + "," + encaminhada + ",'" + texto + "')";
      let resultados = await connection.request().query(StrSQL);
      
      if (status == 68){
        StrSQL="UPDATE ocorrencias SET oco_encerrada = "  + atendente + ", oco_data_encer = convert(datetime, getdate(), 103) WHERE oco_cod = " + ocorrencia;
        let resultados2 = await connection.request().query(StrSQL);
      }
      return res.status(200).json(retorno);
    }   

}    
export default new OcorrenciasController();    