var connectionFactory = require('../../database.js');
import * as Yup from 'yup';
import authConfig from '../../config/auth';
import jwt from 'jsonwebtoken';
import util from "../util";
const nodemailer = require('nodemailer');
var moment = require('moment');

class OperacionalController {
    async cargos(req, res) {
        const modelo =  [{ codigo: 1, titulo: "Gerente" },
        { codigo: 2, titulo: "Vendedor" },
        { codigo: 3, titulo: "Proprietário" }]
        var connection = await connectionFactory();
        try{
          var resultados = await connection.request().query("select cad_cod as codigo, cad_descricao as titulo from cadastros_gerais where cad_tipo = 73 and cad_ativo = 1 order by cad_descricao");
            return res.status(200).json(resultados.recordset);
        } catch(err){
            return res.status(500).json({status: 'erro', detalhes: err}); 
        }
    }    
    async estadocivil(req, res) {
        const modelo = [
            { codigo: 1, titulo: "Solteiro" },
            { codigo: 2, titulo: "Casado" },
            { codigo: 3, titulo: "Divorciado" }
        ]
        var connection = await connectionFactory();
        try{
          var resultados = await connection.request().query("select cad_cod as codigo, cad_descricao as titulo from cadastros_gerais where cad_tipo = 24 and cad_ativo = 1 order by cad_descricao");
          return res.status(200).json(resultados.recordset);
        } catch(err){
          return res.status(500).json({status: 'erro', detalhes: err}); 
        }
    }    
    async sexo(req, res) {
        const resultado = [
            { codigo: 1, titulo: "Masculino" },
            { codigo: 2, titulo: "Feminino" },
            { codigo: 3, titulo: "Não informado" }
          ]
        var connection = await connectionFactory();
        try{
          var resultados = await connection.request().query("select cad_cod as codigo, cad_descricao as titulo from cadastros_gerais where cad_tipo = 21 and cad_ativo = 1 order by cad_descricao");
           return res.status(200).json(resultados.recordset);
        } catch(err){
          return res.status(500).json({status: 'erro', detalhes: err}); 
        }
    }   
    async scripts(req, res) {
        const modelo = [
            {
              codigo: 1,
              nome: "Atendimento Receptivo - Proprietário e Balconista",
              conteudo:
                "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam vehicula sollicitudin libero vitae scelerisque. Fusce aliquet ut massa ut egestas. Curabitur ullamcorper nulla a faucibus venenatis. Praesent ut volutpat libero. Cras suscipit mattis efficitur. Suspendisse auctor justo sit amet volutpat egestas. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Aenean ultricies fermentum est vitae finibus. Donec vel metus et massa pellentesque condimentum. Quisque tempus gravida risus eu molestie. Vivamus felis elit, rhoncus eget felis et, sodales pulvinar lacus.     Donec lobortis quis urna sit amet vehicula. Duis in nulla rutrum, venenatis ligula at, sodales erat. Morbi at semper est, eu egestas velit. Vivamus mollis augue nisl, sed molestie lorem bibendum quis. Donec ac pretium massa, sed ultricies metus. In porttitor venenatis convallis. Phasellus euismod sed odio eu maximus.",
				"caminho": "arquivo.htm" 	
            },
            { codigo: 2, nome: "Atendimento Receptivo Vendedores", "conteudo": "", "caminho": "arquivo.htm"  },
            { codigo: 3, nome: "Banner Dashboard Vendedores", "conteudo": "", "caminho": "arquivo.htm"  },
            { codigo: 4, nome: "CONECTOR", "conteudo": "", "caminho": "arquivo.htm"  },
            { codigo: 5, nome: "FALE CONOSCO", "conteudo": "", "caminho": "arquivo.htm" }
          ]
		  var url_base_scripts = "http://teste.com.br/cliente/scripts/";
          var connection = await connectionFactory();
          try{
            var resultados = await connection.request().query("select scr_cod as codigo, scr_descricao as nome, '' as conteudo, reverse(left(reverse(scr_caminho), CHARINDEX('\\', reverse(scr_caminho))-1)) as caminho from scripts_sao where scr_ativo = 1");
			var retorno = resultados.recordset;
			for (var index = 0; index < retorno.length; index++) { 
				if (retorno[index].codigo !== 13){
					var url = url_base_scripts + retorno[index].caminho;
					let { response, body } = await util.get(url);
   				    if (response.statusCode == 200) {
					   retorno[index].conteudo = body;
					}
					
				}
			}
             return res.status(200).json(retorno);
          } catch(err){
            return res.status(500).json({status: 'erro', detalhes: err}); 
          }
    }

    async pausa(req, res) {
      //http://localhost:3000/pausa/32970
      var operador = 0;
      if (req.params.operador){
        operador = req.params.operador;
      }
        const modelo = [
            {codigo: 1, abertura: "08:00", encerramento: "08:10", motivo: "Lanche", minutos: 10},
            {codigo: 2, abertura: "08:00", encerramento: "08:10", motivo: "Lanche", minutos: 10},
            {codigo: 3, abertura: "08:00", encerramento: "08:10", motivo: "Lanche", minutos: 10},
            {codigo: 4, abertura: "08:00", encerramento: "08:10", motivo: "Lanche", minutos: 10},
            {codigo: 5, abertura: "08:00", encerramento: "08:10", motivo: "Lanche", minutos: 10},
            {codigo: 6, abertura: "08:00", encerramento: "08:10", motivo: "Lanche", minutos: 10},
            {codigo: 7, abertura: "08:00", encerramento: "08:10", motivo: "Lanche", minutos: 10},
            {codigo: 8, abertura: "08:00", encerramento: "08:10", motivo: "Lanche", minutos: 10}
          ]
          var connection = await connectionFactory();
          try{
            var resultados = await connection.request().query("select top 20 pau_cod as codigo, FORMAT (pau_inicio, 'dd/MM/yyyy HH:mm:ss')  as abertura, FORMAT (pau_fim, 'dd/MM/yyyy HH:mm:ss')  as encerramento, cad_descricao as motivo, DATEDIFF (mi, pau_inicio , pau_fim ) as minutos from pausas_sao, cadastros_gerais where pau_motivo = cad_cod and pau_atendente = " + operador + " order by pau_cod desc");
             return res.status(200).json(resultados.recordset);
          } catch(err){
            return res.status(500).json({status: 'erro', detalhes: err}); 
          }
    }

    async pausa_tipo(req, res) {
        const modelo = [
            { codigo: 1, titulo: "Lanche" },
            { codigo: 2, titulo: "Particular" },
            { codigo: 3, titulo: "Pós-Atendimento" },
            { codigo: 4, titulo: "Reunião" }
          ]
          var connection = await connectionFactory();
          try{
            var resultados = await connection.request().query("select cad_cod as codigo, cad_descricao as titulo from cadastros_gerais where cad_tipo = 632 and cad_ativo = 1 order by cad_descricao");
             return res.status(200).json(resultados.recordset);
          } catch(err){
            return res.status(500).json({status: 'erro', detalhes: err}); 
          }
    }

    async discador(req, res) {
        //request
        //{
        //  "ponto_atendimento": 0,
        //  "operador": 0
        //}
        var retorno = { entidade: 0, fila_discador: 0 }
        var ddd = "";
        var entidade = 0;
        var telefone = "";
        var telefone_discador = "";
        var ponto_atendimento = 0;
        var operador = 0;
        var discador_id = 0;
        if (req.body.ponto_atendimento){
          ponto_atendimento = req.body.ponto_atendimento;
        }
        if (req.body.operador){
          operador = req.body.operador;
        }
        var connection = await connectionFactory();
        var continuar = false;
        var gravar_acao = false;
        var resultados = await connection.request().query("SELECT top 1 * from discador.dbo.discador where dis_status is null and dis_fila in (849) and dis_pa='" + ponto_atendimento + "'");
        resultados.recordset.forEach(function(item) {
          discador_id = item.dis_id;
          telefone_discador = item.dis_telefone;
          ddd =  telefone_discador.substring(0, 2);
          telefone =  telefone_discador.substring(1, 11);
          continuar = true;
        });

        if (continuar){
          var resultados2 = await connection.request().query("SELECT top 1 tel_entidade from telefones where tel_ddd = " + ddd + " and tel_numero = " + telefone + " and tel_excluido <> 'S' and tel_entidade in (select ent_cod from entidades where ent_tipo = 2272)");
          resultados2.recordset.forEach(function(item2) {
              entidade = item2.tel_entidade;
              gravar_acao = true;
          });
        }

        if (gravar_acao){
          var resultados4 = await connection.request().query("INSERT INTO controle_acoes_discador (ctl_entidade, ctl_fila_discador, ctl_operador, ctl_data_cad, ctl_telefone) VALUES (" + entidade + ", " + discador_id + ", " + operador + ", convert(datetime, getdate(), 103), '" + telefone_discador + "')");
        } 
        var resultados4 = await connection.request().query("UPDATE discador.dbo.discador SET dis_status = 1 WHERE dis_id = " + discador_id);
        
        retorno.entidade = entidade;
        retorno.fila_discador = discador_id;
        return res.status(200).json(retorno);
    }

    async motivos(req, res) {
        const modelo = [
            {
              codigo: 1,
              titulo: "Elogio",
              motivos: [
                { codigo: 1, titulo: "Opção 1" },
                { codigo: 2, titulo: "Opção 2" },
                { codigo: 3, titulo: "Opção 3" },
                { codigo: 4, titulo: "Opção 4" }
              ]
            },
            {
              codigo: 2,
              titulo: "Informação",
              motivos: [
                { codigo: 5, titulo: "Opção 5" },
                { codigo: 6, titulo: "Opção 6" },
                { codigo: 7, titulo: "Opção 7" },
                { codigo: 8, titulo: "Opção 8" }
              ]
            },
            {
              codigo: 3,
              titulo: "Reclamação",
              motivos: [
                { codigo: 9, titulo: "Opção 9" },
                { codigo: 10, titulo: "Opção 10" },
                { codigo: 11, titulo: "Opção 11" },
                { codigo: 12, titulo: "Opção 12" }
              ]
            },
            {
              codigo: 4,
              titulo: "Problemas no site",
              motivos: [
                { codigo: 13, titulo: "Opção 13" },
                { codigo: 14, titulo: "Opção 14" },
                { codigo: 15, titulo: "Opção 15" },
                { codigo: 16, titulo: "Opção 16" }
              ]
            }
          ]

        var retorno = [];  
        var connection = await connectionFactory();
        try{
          var resultados = await connection.request().query("SELECT cad_cod as codigo, cad_descricao as titulo FROM dbo.cadastros_gerais WHERE cad_tipo = 579 AND CAD_ATIVO = 1");
          resultados.recordset.forEach(function(item) {
              var tmp = {codigo: item.codigo, titulo: item.titulo};
              retorno.push(tmp);
          });
          
          for (var index = 0; index < retorno.length; index++) { 
            var tmp_array_motivos = [];
            var codigo = retorno[index].codigo;
            var resultados2 = await connection.request().query("SELECT cad_cod as codigo, cad_descricao as titulo FROM dbo.cadastros_gerais WHERE cad_ativo = 1 and cad_tipo = " + codigo);
            resultados2.recordset.forEach(function(item2) {
              var tmp2 = {codigo: item2.codigo, titulo: item2.titulo};
              tmp_array_motivos.push(tmp2);
            });
            retorno[index].motivos = tmp_array_motivos;
          };

          return res.status(200).json(retorno);
        } catch(err){
          return res.status(500).json({status: 'erro', detalhes: err}); 
        }
    }

    async endereco_tipo(req, res) {
      const modelo =[
        {
          codigo: 32,
          titulo: "Residencial"
        },
        {
          codigo: 33,
          titulo: "Comercial"
        },
        {
          codigo: 34,
          titulo: "Entrega"
        }
      ]
      var connection = await connectionFactory();
      try{
        var resultados = await connection.request().query("select cad_cod as codigo, cad_descricao as titulo from cadastros_gerais where cad_tipo = 31 and cad_ativo = 1 order by cad_descricao");
         return res.status(200).json(resultados.recordset);
      } catch(err){
        return res.status(500).json({status: 'erro', detalhes: err}); 
      }
  }

  async telefone_tipo(req, res) {
    const modelo = [
      {
        codigo: 515,
        titulo: "Residencial"
      },
      {
        codigo: 516,
        titulo: "Comercial"
      },
      {
        codigo: 727,
        titulo: "Celular"
      }
    ]
    var connection = await connectionFactory();
    try{
      var resultados = await connection.request().query("select cad_cod as codigo, cad_descricao as titulo from cadastros_gerais where cad_tipo = 514 and cad_ativo = 1 order by cad_descricao");
       return res.status(200).json(resultados.recordset);
    } catch(err){
      return res.status(500).json({status: 'erro', detalhes: err}); 
    }
  }

  async CEP(req, res) {
    //http://localhost:3000/CEP/05455000
    let retorno = {}
    var CEP = '01532001';
    if (req.params.cep){
      CEP = req.params.cep;
    }
    retorno.cep = CEP;
    retorno.estado = '';
    retorno.cidade = '';
    retorno.bairro = '';
    retorno.rua = '';
    let StrSQL = "";
    let cep_localidade = false;
    const GS_CEP =" cep.dbo.";
    var connection = await connectionFactory();
    StrSQL = "SELECT * FROM " + GS_CEP + "localidades WHERE cep = '" +  CEP + "'";
    let resultados = await connection.request().query(StrSQL);
    resultados.recordset.forEach(function(item) {
        retorno.estado = item.estado;
        retorno.cidade = item.cidade;
        cep_localidade = true;
    });

    if (!cep_localidade){
        StrSQL = "SELECT * FROM " + GS_CEP + "logradouros WHERE cep = '" +  CEP + "'";
        let resultados2 = await connection.request().query(StrSQL);
        resultados2.recordset.forEach(function(item) {
            retorno.rua = item.rua;
            retorno.bairro = item.bairro;
            retorno.estado = item.estado;
            retorno.cidade = item.cidade;        
        });
    }
    return res.status(200).json(retorno);
  }

  async rastreio(req, res) {
    //Rastreio do item
	//http://localhost:3001/rastreio/1394873
    //const codigo_item = 15253;
	var codigo_item = 0;
	if (req.params.codigo){
		codigo_item = req.params.codigo;
	}
    let retorno = [];
    var connection = await connectionFactory();
    let sqlQry1 = "SELECT RTR_CODIGO, RTR_TRI_COD, RTR_STATUS,  FORMAT (RTR_DATA_HORA, 'dd/MM/yyyy') as RTR_DATA_HORA, FORMAT (RTR_DATA_HORA, 'HH:mm:ss') as RTR_DATA_HORA_2, RTR_NUMOBJETO, RTR_NOME_RECEBEDOR, RTR_NF, RTR_TRANSPORTADORA, (SELECT cad_descricao FROM dbo.cadastros_gerais WHERE (cad_cod = a.RTR_STATUS)) AS descricao_rastreio FROM dbo.rastreio_troca AS a WHERE(RTR_TRI_COD = " + codigo_item +") ORDER BY RTR_CODIGO DESC";
    let resultados = await connection.request().query(sqlQry1);
    resultados.recordset.forEach(function(item) {
        let tmp = {};
        tmp.data = item.RTR_DATA_HORA;
        tmp.hora = item.RTR_DATA_HORA_2;
        if (item.descricao_rastreio){
            tmp.descricao = item.descricao_rastreio;
        }
        if (!item.RTR_NUMOBJETO) {
            if (item.RTR_TRANSPORTADORA=="CORREIOS"){
                tmp.numero_objeto = "http://websro.correios.com.br/sro_bin/txect01$.QueryList?P_LINGUA=001&P_TIPO=001&P_COD_UNI=" +  item.RTR_NUMOBJETO;
            } else {
                tmp.numero_objeto = item.RTR_NUMOBJETO;
            } 
        } 

        tmp.nome_recebedor = item.RTR_NOME_RECEBEDOR;
        tmp.numero_nf = item.RTR_NF;
        tmp.transportadora = item.RTR_TRANSPORTADORA;
        retorno.push(tmp);
    });
    return res.status(200).json(retorno);
  }

  async login(req, res) {
    //http://localhost:3000/login
    //request
    //{
    //  "login": "daniel.bins",
    //  "senha": "zeroonze"
    //}

    // validando os dados de sessão
    const schema = Yup.object().shape({
      login: Yup.string().required(),
      senha: Yup.string().required()
    });
    if(!(await schema.isValid(req.body))){
      return res.status(400).json({ mensagem: "Erro ao enviar dados para o login do usuário, por favor verifique o layout dos dados enviados " })
    }

    var login = "daniel.bins";
    var senha = "zeroonze";
    var retorno = {};
    if (req.body.login){
      login = req.body.login;
    }
    if (req.body.senha){
      senha = req.body.senha;
    }
    var localizado = false;
    var id = 0;
    var connection = await connectionFactory();
    let StrSQL = "SELECT * from usuarios_sao, cadastros_gerais where usu_departamento = cad_cod and usu_login  = '" + login +"' and usu_senha = '" + senha+ "' and usu_ativo = 1";
    let resultados = await connection.request().query(StrSQL);
    resultados.recordset.forEach(function(item) {
      retorno.nome = item.usu_nome;
      retorno.codigo = item.usu_cod;
      retorno.departamento = item.usu_departamento;
      retorno.tipo = item.usu_tipo;
      retorno.ip = item.usu_ip;
      retorno.pendentes = 0;
      retorno.nome_departamento = item.cad_descricao;
      localizado = true;
      id = item.usu_cod;
    });

    if (localizado){
      retorno.token = jwt.sign({ id }, authConfig.secret, {
        expiresIn : authConfig.expiresIn,
      });
	  StrSQL="SELECT count(oco_cod) as Total_Aberta from VW_UltimoItemOcorrencia Where cod_encaminhada = " + id + " and Status <> 'Encerrada'";
      var resultados2 = await connection.request().query(StrSQL);
      resultados2.recordset.forEach(function(item2) {
          retorno.pendentes = item2.Total_Aberta;
      });	
    } else {
      retorno.mensagem = "O login informado não foi localizado";
    }  
    return res.status(200).json(retorno);
  }

  async historico_gravar(req, res) {
    //request
    //{
    //  "cliente": 625,
    //  "atendente": 10,
    //  "texto": "Teste API"
    //}
    var retorno =  { codigo:0};
    var cliente = 0;
    var atendente = 0;
    var texto = '';
    var motivo = 2493;
    var StrSQL = "";
    if (req.body.cliente){
      cliente = req.body.cliente;
    }
    if (req.body.atendente){
      atendente = req.body.atendente;
    }
    if (req.body.texto){
      texto = req.body.texto;
    }
    var connection = await connectionFactory();
    StrSQL = "INSERT INTO historicos (his_entidade, his_atendente, his_data, his_texto) VALUES (" + cliente + "," + atendente + ",convert(datetime, getdate(), 103), '" + texto + "')";
    let resultados = await connection.request().query(StrSQL);
    var novo_codigo = 0;
    
    StrSQL = "SELECT max(his_cod) as ultimo_codigo from historicos where his_entidade = " + cliente;
    let resultados2 = await connection.request().query(StrSQL);
    resultados2.recordset.forEach(function(item) {
      novo_codigo = item.ultimo_codigo;
    });

    StrSQL="INSERT INTO historicos_itens (hii_historico, hii_motivo) VALUES (" + novo_codigo + "," + motivo + ")";
    let resultados3 = await connection.request().query(StrSQL);
    retorno.codigo = novo_codigo;
    return res.status(200).json(retorno);
  }

  async motivo_gravar(req, res) {
    //{
    //  "entidade": 625,
    //  "atendente": 10,
    //  "motivo": 2750
    //}
    var retorno =  { codigo:0};
    var StrSQL = "";
    var motivo = 0;
    var atendente = 0;
    var entidade = 0;
    var novo_codigo = 0;
    var descricao_motivo = "";

    if (req.body.motivo){
      motivo = req.body.motivo;
    }
    if (req.body.atendente){
      atendente = req.body.atendente;
    }
    if (req.body.entidade){
      entidade = req.body.entidade;
    }
    var connection = await connectionFactory();
    StrSQL = "SELECT cad_descricao from cadastros_gerais where cad_ativo = 1 and cad_cod = " + motivo;
    let resultados = await connection.request().query(StrSQL);
    resultados.recordset.forEach(function(item) {
      descricao_motivo = item.cad_descricao;
    });

    StrSQL = "EXEC SP_historicos_cad_novo " + entidade + ", " + atendente + ", 0, '" + descricao_motivo + "'";
    let resultados2 = await connection.request().query(StrSQL);
    resultados2.recordset.forEach(function(item) {
      novo_codigo = item.Codigo;
    });

    StrSQL = "EXEC SP_historicos_itens_cad " + novo_codigo + ", " + motivo;
    let resultados3 = await connection.request().query(StrSQL);

    retorno.codigo = novo_codigo;
    return res.status(200).json(retorno);
  }

  async pausa_iniciar(req, res) {
    //http://localhost:3000/pausa_iniciar
    //request
    //{
     // "usuario":10,
    //  "motivo": 633
     // }
    var retorno =  { codigo:0};
    var StrSQL = "";
    var continuar = true;
    var usuario = 0;
    var motivo = 0;
    var projeto = "2136863";

    if (req.body.usuario){
      usuario = req.body.usuario;
    }
    if (req.body.motivo){
      motivo = req.body.motivo;
    }

    var connection = await connectionFactory();
    //Para evitar duplicidade na base do ponto
    StrSQL = "select pau_atendente from pausas_sao where pau_inicio between DATEADD(second, -20, CURRENT_TIMESTAMP) and current_timestamp AND pau_atendente = " + usuario;
    let resultados = await connection.request().query(StrSQL);
    resultados.recordset.forEach(function(item) {
      continuar = false;
    });
    if (continuar){
      StrSQL = "INSERT pausas_sao (pau_motivo, pau_atendente, pau_inicio, pau_fim) Values(" + motivo + ", " + usuario + ", convert(datetime, getdate(), 103), Null)";
      let resultados2 = await connection.request().query(StrSQL);

      StrSQL = "SELECT MAX(PAU_COD) AS codigo FROM PAUSAS_SAO WHERE PAU_ATENDENTE = " + usuario;
      let resultados3 = await connection.request().query(StrSQL);
      resultados3.recordset.forEach(function(item) {
        retorno.codigo = item.codigo;
      });
      var intervalo = await util.Gravar_Intervalo(projeto, usuario, connection);
    }
    return res.status(200).json(retorno);
  }

   async pausa_finalizar(req, res) {
     //http://localhost:3000/pausa_finalizar
     //{
     // "usuario":10,
     // "codigo_pausa": 1229
     //}

    var retorno =  { codigo:1};
    var StrSQL = "";
    var codigo_pausa = 0;
    var usuario = 0;
    var projeto = "2136863";

    
    if (req.body.usuario){
      usuario = req.body.usuario;
    }
    if (req.body.codigo_pausa){
      codigo_pausa = req.body.codigo_pausa;
    }
    
    var connection = await connectionFactory();
    StrSQL = "UPDATE pausas_sao SET pau_fim = convert(datetime, getdate(), 103) WHERE pau_cod = " + codigo_pausa;
    let resultados = await connection.request().query(StrSQL);

    var intervalo = await util.Gravar_Intervalo(projeto, usuario, connection);
    
    return res.status(200).json(retorno);
  }

  
  async finalizapedido (req, res){
      //http://localhost:3000/finalizapedido
      //request
      //{
      //  "CPF": "18504473813",
      //  "produto": "902019862",
      //  "quantidade": 1,
      //  "usuario": 10
      //  }

      //Exemplo response
      //{
      //  "enviou_email": "SIM",
      //  "enviou_SMS": "NAO",
      //  "status": "O ESTOQUE DESTE PRODUTO ACABOU",
      //  "resultado": "NAO FOI FEITO",
      //  "saldo": 0
      //}
      //Exemplo sucesso
      //{
      //  "enviou_email": "NAO",
      //  "enviou_SMS": "NAO",
      //  "status": "TROCA EFETUADA COM SUCESSO",
      //  "resultado": "TROCA EFETUADA COM SUCESSO",
      //  "saldo": 399
      //}

      let retorno = {}
      retorno.enviou_email = "NAO";
      retorno.enviou_SMS = "NAO";
      retorno.status = "";
      let usuario = 87 //Processamento
      let CPF = "32867974801"; //TESTES
      let produto = "902015800"; //Doacao
	  let produtos = [];
      let quantidade = 1;
      const projeto = "2136863";
      const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress || req.socket.remoteAddress || (req.connection.socket ? req.connection.socket.remoteAddress : null);
      let to  = '';
      let telefone = '';
      let codigo_transacao = 0;
      let codigo_transacao_SGO = 0;
      let codigo_produto = 0;
      let entidade = 0;
      let codigo_SMS = 0;
      let tel_cod = 0;

      if (req.body.produto){
        produto = req.body.produto;
      }
      if (req.body.quantidade){
        quantidade = req.body.quantidade;
      }
      if (req.body.CPF){
        CPF = req.body.CPF;
      }
      if (req.body.usuario){
        usuario = req.body.usuario;
      }
	  
	  if (req.body.produtos){
		 produtos = req.body.produtos;
	  }

      var connection = await connectionFactory();

      //Devolver resultado e saldo depois da troca
      retorno.resultado = "NAO FOI FEITO";
      retorno.saldo = 0;

      let saldo = 0;
      let email = '';
      let troca_valida = true;
      let disparar_email = false;
      let disparar_sms = false;
      let produto_promocao = false;
      let total_troca = 0;
      let conta = 0;
      let endereco = 0;
      let pro_cod_cad_unico = 0;
      let valor_unitario_produto = 0;
      let StrSQL = "";
      
      //Validar produto e quantidade
	  for (var index = 0; index < produtos.length; index++) { 
		troca_valida = true;
		  produto = produtos[index].produto;
		  quantidade = produtos[index].quantidade;
		  StrSQL = "SELECT pro_cod, pro_status, pro_valor, pro_cod_cad_unico from produtos where pro_cod_ext1 = '" + produto + "'";
		  let dados_produto = await connection.request().query(StrSQL);
		  dados_produto.recordset.forEach(function(item) {
			  if (item.pro_status == "872" || item.pro_status == "6101"){
				  //OK
				  if (item.pro_status == 6101){
					  produto_promocao = true;
				  }
			  } else {
				  troca_valida = false;
				  retorno.status = "O PRODUTO NAO ESTÁ MAIS DISPONIVEL PARA TROCA";
			  }
			  codigo_produto = item.pro_cod;
			  valor_unitario_produto = item.pro_valor;
			  total_troca = item.pro_valor * quantidade;
			  pro_cod_cad_unico = item.pro_cod_cad_unico;
			  total_troca += parseInt(total_troca);
		  }); 
		  
		   //Verificar se tem estoque (apenas quando o status é promocao)
		  if (produto_promocao){
			  let estoque_atual = 0;
			  let estoque_fisico = 0;
			  let pedidos_efetuados = 0;
			  let F004_CG00 = 0;
			  let F004A_pro_cod = 0;
			  StrSQL="SELECT (PROD.F004_est_fisico) qtd FROM gerencial.dbo.F004 PROD WHERE PROD.F004_codigo = " + pro_cod_cad_unico + " AND PROD.F004_cg00 = " + projeto;
			  let rst_estoque_fisico = await connection.request().query(StrSQL);
			  rst_estoque_fisico.recordset.forEach(function(item) {
				  estoque_fisico = item.qtd
			  });

			  StrSQL="SELECT F004_CG00, F004A_pro_cod FROM gerencial.dbo.F004_AUX WHERE F004_CODIGO = " + pro_cod_cad_unico;
			  let produto_SGO = await connection.request().query(StrSQL);
			  produto_SGO.recordset.forEach(function(item) {
				  F004_CG00 = item.F004_CG00;
				  F004A_pro_cod = item.F004A_pro_cod;
			  });
			  StrSQL="SELECT (SUM(IPED.F007_QUANTIDADE)) qtd FROM gerencial.dbo.F007 IPED ";
			  StrSQL +=" INNER JOIN gerencial.dbo.F006 PED ON PED.F006_codigo = IPED.F006_codigo ";
			  StrSQL +=" WHERE IPED.F004_codigo = "+ F004A_pro_cod;
			  StrSQL +=" AND PED.F006_origem = " + F004_CG00;
			  StrSQL +=" AND IPED.F007_status in (2,3,6) ";
			  StrSQL +="  AND PED.F006_tipo = 2";
			  let pedidos = await connection.request().query(StrSQL);
			  pedidos.recordset.forEach(function(item) {  
				  pedidos_efetuados = item.qtd;
			  });
			  estoque_atual = parseInt(estoque_atual) - parseInt(pedidos_efetuados);
			  if ((parseInt(estoque_atual) - parseInt(quantidade))<0){
				  troca_valida = false;
				  retorno.status = "O ESTOQUE DESTE PRODUTO ACABOU - " + produto;
			  }
		  }
		  
	  }

      //Retornar dados do cliente - conta - endereco - telefone
      StrSQL = "SELECT ent_cod, ent_nome, ent_email, ent_email_capt, ent_doc01, con_cod ";
      StrSQL += " FROM entidades, contas ";
      StrSQL += " WHERE ent_cod = con_entidade ";
      StrSQL += " and ent_doc01 = '" + CPF + "' ";
      let dados_cliente = await connection.request().query(StrSQL);
      dados_cliente.recordset.forEach(function(item) {
          entidade = item.ent_cod;
          conta = item.con_cod;
		  email = item.ent_email;
          if (email == 'null' || email == '' || email === null || email ===undefined){
              //Nao faz nada
			  email = "";
          } else {
              email = ent_email;
          }
      });
      if (entidade > 0){
          StrSQL = "SELECT top 1 * from telefones where tel_tipo in (727, 4121) and tel_ddd <> 0 and tel_excluido <> 'S' and tel_entidade = " + entidade;
          let dados_telefone = await connection.request().query(StrSQL);
          dados_telefone.recordset.forEach(function(item) {
              telefone =  "55" + item.tel_ddd + item.tel_numero;
              tel_cod = item.tel_cod;
          });

          StrSQL = "SELECT end_cod from enderecos where end_excluido <> 'S' and end_tipo in (32, 33) and end_entidade = " +entidade;
          let dados_endereco = await connection.request().query(StrSQL);
          dados_endereco.recordset.forEach(function(item) {
              endereco = item.end_cod;
          });
      }

      //Verificar se tem saldo
      StrSQL = "EXEC SP_saldo_tot_cli '" + CPF + "'";
      let resultados_saldo = await connection.request().query(StrSQL);
      saldo = resultados_saldo.recordset[0].saldo;
      if (saldo == 'null' || saldo == '' || saldo === null || saldo ===undefined){
          saldo = 0;
      }
      retorno.saldo = saldo;
      if (parseInt(saldo) < parseInt(total_troca)){
          troca_valida = false;
          retorno.status = "SALDO INSUFICIENTE";
      }
      if (parseInt(total_troca) <=0){
          troca_valida = false;
      }
    
      if (troca_valida){
          //Gravar transacao SAO/SGO
          let executar_integra1 = false;
          let executar_integra2 = false;
          const GS_Gerencial =" gerencial.dbo.";

          let f001_tipo = "";
          let f001_nome = "";
          let f001_doc01 = "";
          let f001_cg00 = "";
          let f001_rt01 = "";
          let f001_rn01 = "";
          let f001_rd01 = "";

          let end_compl = "";
          let end_numero = "";
          let f002_tipo = "";
          let end_rua = "";
          let end_cep = "";
          let end_bairro = "";
          let end_cidade = "";
          let f002_uf = "";

          let codigo_f001 = 0;
          let codigo_f002 = 0;

          //Pesquisar Cliente SAO
          StrSQL="SELECT f001_tipo, f001_nome, f001_doc01, f001_cg00, f001_rt01, f001_rn01, FORMAT(f001_rd01, 'yyyy-MM-dd') as f001_rd01 FROM vw_entidades_sgo WHERE con_cod = " + conta + " AND f001_cg00 = "+ projeto;
          let pesquisa1 = await connection.request().query(StrSQL);
          pesquisa1.recordset.forEach(function(item) {
              f001_tipo = item.f001_tipo;
              f001_nome = item.f001_nome;
              f001_doc01 = item.f001_doc01;
              f001_cg00 = item.f001_cg00;
              f001_rt01 = item.f001_rt01;
              f001_rn01 = item.f001_rn01;
              f001_rd01 = item.f001_rd01; //Formatar como Data!
              executar_integra1 = true;
          });

          //Pesquisar Endereco SAO
          StrSQL="SELECT (SELECT c001_codigo FROM " + GS_Gerencial + "C001 WHERE c000_codigo = 4 AND c001_descricao = dbo.cadastros_gerais.cad_descricao) As f002_tipo, end_rua, end_numero, end_compl, end_cep, end_bairro, end_cidade, (SELECT c001_codigo FROM SRDB005.gerencial.dbo.C001 WHERE c000_codigo = 3 AND c001_descricao = dbo.enderecos.end_estado) As f002_uf, cad_descricao, end_estado FROM enderecos, cadastros_gerais WHERE end_tipo = cad_cod AND end_cod = " + endereco;
          let pesquisa2 = await connection.request().query(StrSQL);
          pesquisa2.recordset.forEach(function(item) {
              //remover apostrofos - nao mandar campos nulos'
              end_compl = item.end_compl;
              end_numero = item.end_numero;
              f002_tipo = item.f002_tipo;
              end_rua = item.end_rua;
              end_compl = item.end_compl;
              end_cep = item.end_cep;
              end_bairro = item.end_bairro;
              end_cidade = item.end_cidade;
              f002_uf = item.f002_uf;
              executar_integra2 = true;
          });

          if (executar_integra1){
              //Integra F001
              StrSQL="EXEC " + GS_Gerencial + "sp_F001Integracao " + f001_tipo + ", '" + f001_nome + "', '" + f001_doc01 + "', " + f001_cg00 + ", '" + f001_rt01 + "', " + f001_rn01 + ", '"+ f001_rd01 + "'";
              let integra1 = await connection.request().query(StrSQL);
              
              StrSQL="SELECT TOP 1 f001_codigo FROM " + GS_Gerencial + "F001 WHERE  f001_rn01 = " + f001_rn01 + " AND f001_tipo = " + f001_tipo + " AND f001_cg00 = " + projeto;
              let f001 = await connection.request().query(StrSQL);
              f001.recordset.forEach(function(item) {
                  codigo_f001 = item.f001_codigo;
              });
          }
          if (executar_integra2){
              //Integra f002
              StrSQL="EXEC " + GS_Gerencial + "sp_F002Integra " + f002_tipo + ", '" + end_rua + "', " + end_numero + ", '" + end_compl + "', '" + end_cep + "', '" + end_bairro + "', '" + end_cidade + "', " + f002_uf + ", 1, " + codigo_f001;
              let integra2 = await connection.request().query(StrSQL);
              StrSQL="SELECT TOP 1 f002_codigo FROM " + GS_Gerencial + "F002 WHERE f001_codigo = " + codigo_f001 + " order by f001_codigo desc";
              let f001 = await connection.request().query(StrSQL);
              f001.recordset.forEach(function(item) {
                  codigo_f002 = item.f002_codigo;
              });
          }
      
          //Gravar SAO
          if (codigo_f001 > 0 && codigo_f002 > 0){
              const TipoTransacao = 678;
              const origem_transacao = 1072;
              const  CodigoBandeira="NULL";
              const Parcelas="NULL";
              const Valor_Parcelas="NULL";
              const ls_confirmacao = "NULL";
              //const Usuario = 87; //Processamento
              const ls_posta = "";
              const ls_sem_pontos = "";
              const TxtFrete = 0;
              
              StrSQL="INSERT INTO transacoes (tra_conta, tra_origem, tra_forma_pgto, tra_tipo, tra_data, tra_valor, tra_cupom, tra_nf, tra_arquivo, tra_end_entrega, tra_dc, tra_usuario, tra_novo, tra_parcelas, tra_valor_parcela, tra_frete, tra_par01_texto, tra_par02_texto, tra_par01_num, tra_par02_num) ";
              StrSQL += " VALUES (" + conta  + ", " + origem_transacao + ", NULL, " + TipoTransacao + ", convert(datetime, getdate(), 103), " + total_troca + ", " + ls_confirmacao + ", NULL, NULL, " + endereco + ", 'D', " + usuario + ", 'N', " + Parcelas + ", " + Valor_Parcelas + ", " + TxtFrete + ", '" + ls_posta + "', '" + ls_sem_pontos + "', " + CodigoBandeira + ", " + projeto + ")";
              let gravar_SAO = await connection.request().query(StrSQL);

              //retornar codigo SAO
              StrSQL = "SELECT max(tra_cod) as ultimo from transacoes where tra_tipo = "+ TipoTransacao + " and tra_conta = " + conta;
              let transacao_SAO = await connection.request().query(StrSQL);
              transacao_SAO.recordset.forEach(function(item) {
                  codigo_transacao= item.ultimo;
              });

              if (codigo_transacao > 0){
                  //Gravar SGO
                  const TipoTransacaoSGO="2";
                  const dataSGO = moment().format("YYYY-MM-DD HH:mm:ss");

                  StrSQL="EXEC " + GS_Gerencial + "SP_F006Insert '" + dataSGO + "', NULL, " + TipoTransacaoSGO + " , 1, " + codigo_f001 + ", " + codigo_f002 + ", " + projeto + ", "+ codigo_transacao + ", 0, " + total_troca + ", '" + ls_posta + "'";
                  let gravar_SGO = await connection.request().query(StrSQL);

                  //Retornar codigo SGO
                  StrSQL = "SELECT f006_codigo FROM gerencial.dbo.F006 WHERE f006_origem = " + projeto + " and  f006_transacao = " + codigo_transacao;
                  let transacao_SGO = await connection.request().query(StrSQL);
                  transacao_SGO.recordset.forEach(function(item) {
                      codigo_transacao_SGO = item.f006_codigo;
                  });
              }
          }

          if (codigo_transacao > 0 && codigo_transacao_SGO > 0){
              const dataItemSAO = moment().format("YYYY-MM-DD HH:mm:ss"); 
              //Log entrada
              //Opcional: gravar o IP que fez a troca
              StrSQL = "INSERT INTO controle_de_trocas_sao_site (rev_tra_cod, rev_tra_conta, rev_saldo_antes, rev_tra_valor, rev_data_cad) VALUES (" + codigo_transacao + ", " + conta + ", '" + saldo + "', '" + total_troca + "', convert(datetime, getdate(), 103))";
              let inserir_log = await connection.request().query(StrSQL);

			  const status = 841;//Pendente
			  const localizador = "NULL";
			  for (var index2 = 0; index2 < produtos.length; index2++) { 
				  //Gravar Item
				  var produto2 = produtos[index2].produto;
				  StrSQL = "SELECT pro_cod, pro_status, pro_valor, pro_cod_cad_unico from produtos where pro_cod_ext1 = '" + produto2 + "'";
				  let dados_produto2 = await connection.request().query(StrSQL);
				  var resultado_item = dados_produto2.recordset;
				  for (var index3 = 0; index3 < resultado_item.length; index3++) { 
					var item_pro_cod = resultado_item[index3].pro_cod;
					var item_total_troca = resultado_item[index3].pro_valor * produtos[index2].quantidade;
					var item_quantidade = produtos[index2].quantidade;
					StrSQL="SP_transacoes_itens_cad " + codigo_transacao + "," + item_pro_cod + ",NULL," + conta + ", '" + dataItemSAO + "'," + item_quantidade + "," + item_total_troca + ", NULL  ,NULL , NULL , NULL , NULL , NULL, NULL, NULL , " + localizador + " ," + codigo_transacao_SGO + ","+ status;
					let inserir_item = await connection.request().query(StrSQL);  
				  };
			  }

              //Abater Pontos
              StrSQL="SP_ATU_PONTOS_TROCADOS  '"  + CPF +  "'," + total_troca;
              let abater_pontos = await connection.request().query(StrSQL);

              //Atualizar saldo
              StrSQL = "EXEC SP_saldo_tot_cli '" + CPF + "'";
              let resultados_saldo = await connection.request().query(StrSQL);
              saldo = resultados_saldo.recordset[0].saldo;
              if (saldo == 'null' || saldo == '' || saldo === null || saldo ===undefined){
                  saldo = 0;
              }
              saldo = parseInt(saldo)
              retorno.saldo = saldo;
              
              //Log saida
              StrSQL = "UPDATE controle_de_trocas_sao_site SET rev_saldo_depois = '" + saldo + "', rev_data_atu = convert(datetime, getdate(), 103) WHERE rev_tra_cod = "+  codigo_transacao;
              let atualizar_log = await connection.request().query(StrSQL);
              retorno.status = "TROCA EFETUADA COM SUCESSO";
              retorno.resultado = "TROCA EFETUADA COM SUCESSO";

              disparar_email = true;
          }
      }

      if (tel_cod == 0){
          disparar_sms = false;
      }
      if (email == ''){
          disparar_email = false;
      }

      disparar_sms = false;//DESATIVADO PARA TESTE MANUAL
      //Disparar SMS
      if (disparar_sms){
          Mensagem_SMS = "Parabens pelo resgate realizado no projeto!";

            
          let sqlQry2 = "EXEC SP_INSERT_SMS " + telefone + ", '" + Mensagem_SMS + "', convert(date, getdate(), 103), convert(date, getdate(), 103)";
          let enviar_sms = await connection.request().query(StrSQL);
          enviar_sms.recordset.forEach(function(item) {
              codigo_SMS	=   item.Codigo; 
          });
              
          let sqlQry4 = "update tb_cob_sms SET TEL_COD = " + telCod	 + ", ENT_COD = " + entidade + " WHERE ENT_COD = 0 AND CELULAR = '" + telefone + "'";
          let atualizar_sms = await connection.request().query(StrSQL);
              
          let sqlQry3 = "INSERT INTO gerencial.dbo.F043 (F043_tipoMSG, F043_F003_codigo, F043_texto, F043_data, F043_transacao, F043_projeto, F043_codSmsTww, F043_entidade) ";
          sqlQry3 += "VALUES (2701, " + telCod + ", '" + Mensagem_SMS + "', convert(datetime, getdate(), 103), " + codigo_transacao  + " , " + projeto + ", " + codigo_SMS + ", " + entidade  + ")";
          let gravar_sms = await connection.request().query(StrSQL);
          retorno.enviou_SMS = "SIM";

      }

      //disparar_email = true;//DESATIVADO PARA TESTE MANUAL
      //ATENCAO - INSERIR O E-MAIL REAL DO CLIENTE PARA ENVIAR
      //Disparar Email
      if (disparar_email){
          const transporter = nodemailer.createTransport({
              host: "000.0.00.000",
              port: 25,
              secure: false, // true for 465, false for other ports
              auth: {
                  user: "SAOweb",
                  pass: "SwebAO"
              },
              tls: { rejectUnauthorized: false }
            });

            const mailOptions = {
              from: 'daniel.bins@teste.com.br',
              to:'daniel.bins@teste.com.br',
              subject: 'Resgate de pontos',
              text: 'Sua troca foi efetuada com sucesso'
            };
            transporter.sendMail(mailOptions, function(error, info){
              if (error) {
                console.log(error);
                retorno.enviou_email = "PROBLEMA";
              } else {
                console.log('Email enviado: ' + info.response);
                retorno.enviou_email = "SIM";
              }
            });

          let sqlQry1 = "INSERT INTO gerencial.dbo.F043 (F043_tipoMSG, F043_F003_codigo, F043_texto, F043_EMAIL, F043_data, F043_transacao, F043_projeto, F043_codSmsTww, F043_entidade) ";
          sqlQry1 += " VALUES (4056, 0, 'Resgate de Pontos', '" + to + "',  convert(datetime, getdate(), 103), " + codigo_transacao + ","  + projeto + ", 0," + entidade + ")";
          let gravar_email = await connection.request().query(StrSQL);
      }

      return res.json(retorno);
  }
}    
export default new OperacionalController();       