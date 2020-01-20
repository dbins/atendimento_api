var connectionFactory = require('../../database.js');
var moment = require('moment');

class PontuacoesController {

    async contas(req, res) {
      //http://localhost:3000/contas/625
      var entidade = 0;
      if (req.params.entidade){
        entidade = req.params.entidade;
      }
        const modelo = [
            {
              codigo: 1,
              conta: "11111111",
              produto: "Fidelidade",
              descricao: "Normal",
              status: "A",
              bloq1: "B",
              bloq2: "C",
              vencimento: "20/08/2019",
              validade: "20/08/2019",
              cadastro: "20/08/2019",
              atualizacao: "20/08/2019"
            },
            {
              codigo: 2,
              conta: "11111111",
              produto: "Fidelidade",
              descricao: "Normal",
              status: "A",
              bloq1: "B",
              bloq2: "C",
              vencimento: "20/08/2019",
              validade: "20/08/2019",
              cadastro: "20/08/2019",
              atualizacao: "20/08/2019"
            },
            {
              codigo: 3,
              conta: "11111111",
              produto: "Fidelidade",
              descricao: "Normal",
              status: "A",
              bloq1: "B",
              bloq2: "C",
              vencimento: "20/08/2019",
              validade: "20/08/2019",
              cadastro: "20/08/2019",
              atualizacao: "20/08/2019"
            }
          ]
          var connection = await connectionFactory();
          try{
              var resultados = await connection.request().query("select con_cod as codigo, con_cod_ext as conta,  prc_bandeira as produto, prc_descricao as descricao, con_cod_bloq1, cg1.cad_descricao as status, cg2.cad_descricao as bloq1, cg3.cad_descricao as bloq2, con_data_val as vencimento, FORMAT (con_data_cad, 'd', 'pt-BR' )  as cadastro, FORMAT (con_data_atu, 'd', 'pt-BR' )  as atualizacao from contas, entidades, cadastros_gerais as CG1, cadastros_gerais as CG2, cadastros_gerais as CG3, produtos_contas  where ent_cod = con_entidade and con_produto = prc_cod AND CG1.cad_cod = con_status and cg2.cad_cod = con_cod_bloq1 and cg3.cad_cod = con_cod_bloq2  and ent_cod = " + entidade);
              return res.status(200).json(resultados.recordset);
          } catch(err){
              return res.status(500).json({status: 'erro', detalhes: err}); 
          }
    }   

    async cartoes(req, res) {
      //http://localhost:3000/cartoes/625
      var entidade = 0;
      if (req.params.entidade){
        entidade = req.params.entidade;
      }
        const modelo = [
            {
              codigo: 1,
              cartao: "11111111",
              nome: "BINS do TI",
              titular: "SIM",
              status: "A",
              bloqueio: "A",
              cadastro: "20/08/2019",
              atualizacao: "20/08/2019"
            },
            {
              codigo: 2,
              cartao: "11111111",
              nome: "BINS do TI",
              titular: "SIM",
              status: "A",
              bloqueio: "A",
              cadastro: "20/08/2019",
              atualizacao: "20/08/2019"
            }
          ]
          var connection = await connectionFactory();
          try{
              var resultados = await connection.request().query("select car_cod as codigo, car_cod_ext as cartao, ent_nome as nome, 'SIM' as titular, cg1.cad_descricao as status, cg2.cad_descricao as bloqueio, FORMAT (car_data_cad, 'd', 'pt-BR' ) as cadastro, FORMAT (car_data_atu, 'd', 'pt-BR' ) as atualizacao from cartoes, contas, entidades, cadastros_gerais as CG1, cadastros_gerais as CG2 where ent_cod = con_entidade and con_cod = car_conta AND CG1.cad_cod = car_status_Ext and cg2.cad_cod = car_bloq and car_conta in (select con_cod from contas where con_entidade = " + entidade + ")");
              return res.status(200).json(resultados.recordset);
          } catch(err){
              return res.status(500).json({status: 'erro', detalhes: err}); 
          }
    }   

    async saldo(req, res) {
      //http://localhost:3000/saldo/625
       var entidade = 0;
        if (req.params.entidade){
          entidade = req.params.entidade;
        }
        const modelo =[
            {
              codigo: 1,
              cartao: "11111111",
              pontos: 1000,
              vinculado: 0,
              bonus: 500,
              premio: 0,
              expirados: 0,
              total: 1500
            }
          ]
          var connection = await connectionFactory();
          try{
              var resultados = await connection.request().query("select sal_cod as codigo, car_cod_ext as cartao, sal_pontos as pontos, sal_vinculado as vinculado, sal_bonus as bonus, sal_premios as premios, sal_expirados as expirados, (sal_pontos + sal_bonus - sal_premios - sal_expirados) as total from saldos, contas, cartoes where sal_conta = con_cod and con_cod = car_conta and sal_conta in (select con_cod from contas where con_entidade = " + entidade + ")");
              return res.status(200).json(resultados.recordset);
          } catch(err){
              return res.status(500).json({status: 'erro', detalhes: err}); 
          }
    }   

    async pontos(req, res) {
       //http://localhost:3000/pontos/625
       var entidade = 0;
        if (req.params.entidade){
          entidade = req.params.entidade;
        }
        const modelo = [
            { codigo: 1, data: "20/08/2019", pontos: 50, tipo: "Ação Premiada" },
            { codigo: 2, data: "19/08/2019", pontos: 50, tipo: "Ação Premiada" },
            { codigo: 3, data: "15/08/2019", pontos: 20, tipo: "Ação Premiada" },
            { codigo: 4, data: "14/08/2019", pontos: 50, tipo: "Ação Premiada" },
            { codigo: 5, data: "13/08/2019", pontos: 30, tipo: "Ação Premiada" },
            { codigo: 6, data: "10/08/2019", pontos: 50, tipo: "Ação Premiada" },
            { codigo: 7, data: "08/08/2019", pontos: 50, tipo: "Ação Premiada" },
            { codigo: 8, data: "07/08/2019", pontos: 150,tipo: "Ação Premiada" }
          ]
          var connection = await connectionFactory();
          try{
              var resultados = await connection.request().query("select tra_cod as codigo, FORMAT (tra_data, 'd', 'pt-BR' ) as data, tra_valor as pontos, cad_descricao as tipo from transacoes, cadastros_gerais where tra_tipo = cad_cod and cad_par01_num = 1 and tra_valor > 0 and tra_conta in (select con_cod from contas where con_entidade = " + entidade + ")");
              return res.status(200).json(resultados.recordset);
          } catch(err){
              return res.status(500).json({status: 'erro', detalhes: err}); 
          }
    }   

    async bonus(req, res) {
        //http://localhost:3000/bonus/625
        var entidade = 0;
        if (req.params.entidade){
          entidade = req.params.entidade;
        }
        const modelo = [
            { codigo: 1, data: "20/08/2019", pontos: 50, tipo: "Bônus de Ativação" },
            { codigo: 2, data: "19/08/2019", pontos: 50, tipo: "Bônus de Indicação" },
            { codigo: 3, data: "15/08/2019", pontos: 20, tipo: "Bônus de Indicação" },
            { codigo: 4, data: "14/08/2019", pontos: 50, tipo: "Bônus de Cadastro" }
          ]
          var connection = await connectionFactory();
          try{
              var resultados = await connection.request().query("select tra_cod as codigo, FORMAT (tra_data, 'd', 'pt-BR' ) as data, tra_valor as pontos, cad_descricao as tipo from transacoes, cadastros_gerais where tra_tipo = cad_cod and cad_par01_num = 2 and tra_valor > 0 and tra_conta in (select con_cod from contas where con_entidade = " + entidade + ")");
              return res.status(200).json(resultados.recordset);
          } catch(err){
              return res.status(500).json({status: 'erro', detalhes: err}); 
          }
    }   

    //Para fazer. Agrupar resultados para todas as contas
    async validades(req, res) {
      //http://localhost:3000/validades/625
      var entidade = 0;
      if (req.params.entidade){
        entidade = req.params.entidade;
      }
        const modelo = [
            { periodo: "01/2019", pontos: 10 },
            { periodo: "02/2019", pontos: 10 },
            { periodo: "03/2019", pontos: 10 },
            { periodo: "04/2019", pontos: 10 },
            { periodo: "05/2019", pontos: 10 },
            { periodo: "06/2019", pontos: 10 },
            { periodo: "07/2019", pontos: 10 },
            { periodo: "08/2019", pontos: 10 }
          ]
          var connection = await connectionFactory();
          try{
              var resultados = await connection.request().query("select concat(right('00' + rtrim(month(dateadd(m,12,slm_data))),2), '/', year(dateadd(m,12,slm_data))) as periodo, slm_pontos - slm_trocados as pontos from saldo_mes where slm_data > dateadd(mm, -12, getdate()) and slm_conta in (select con_cod from contas where con_entidade = " + entidade + ")");
              return res.status(200).json(resultados.recordset);
          } catch(err){
              return res.status(500).json({status: 'erro', detalhes: err}); 
          }
    }   

    async expirados(req, res) {
      //http://localhost:3000/expirados/625
      var entidade = 0;
      if (req.params.entidade){
        entidade = req.params.entidade;
      }
        const modelo =[
            { periodo: "01/2019", pontos: 10 },
            { periodo: "02/2019", pontos: 10 },
            { periodo: "03/2019", pontos: 10 },
            { periodo: "04/2019", pontos: 10 },
            { periodo: "05/2019", pontos: 10 },
            { periodo: "06/2019", pontos: 10 },
            { periodo: "07/2019", pontos: 10 },
            { periodo: "08/2019", pontos: 10 }
          ]
          var connection = await connectionFactory();
          try{
              var resultados = await connection.request().query("select concat(right('00' + rtrim(month(slm_data)),2), '/', year(slm_data)) as periodo, slm_pontos - slm_trocados as pontos from saldo_mes where slm_data < dateadd(mm, -12, getdate()) and slm_conta in (select con_cod from contas where con_entidade = " + entidade + ")");
              return res.status(200).json(resultados.recordset);
          } catch(err){
              return res.status(500).json({status: 'erro', detalhes: err}); 
          }
    }  
    
    async pontuacao_manual(req, res) {
        //request
        //{
        //  "tipo": 2,
        //  "literal": 2868,
        //  "entidade": 625,
        //  "pontos": 15,
        //  "usuario": 10
        //}
        var retorno =  { codigo:0};
        var StrSQL = "";
        var tipo = 0;
        var entidade = 0;
        var literal = 0;
        var conta = 0;
        var pontos = 0;
        var usuario = 0;
        var origem = 20;
        var continuar = true;    
        var dt = new Date();
        var ano = dt.getFullYear()
        var mes = dt.getMonth() + 1
        var dia = dt.getDate();
        var dataAtual = ano + '-' + mes + '-' + dia;
        var dataInicioMes = ano + '-' + mes + '-01';
        if (req.body.tipo){
          tipo = req.body.tipo;
        }
        if (req.body.literal){
          literal = req.body.literal;
        }
        if (req.body.entidade){
          entidade = req.body.entidade;
        }
        if (req.body.pontos){
          pontos = req.body.pontos;
        }
        if (req.body.usuario){
          usuario = req.body.usuario;
        }
    
        var connection = await connectionFactory();

        var resultados7 = await connection.request().query("SELECT con_cod FROM contas WHERE con_entidade = " + entidade);
        resultados7.recordset.forEach(function(item7) {
          conta =  item7.con_cod
        });

        StrSQL = "SELECT tra_cod from transacoes where tra_tipo = " + literal + " and tra_conta = " + conta + " and year(tra_data) = year(getdate()) and day(tra_data) = day(getdate()) and month(tra_data) = month(getdate()) and tra_valor = " + pontos;
        let resultados6 = await connection.request().query(StrSQL);
        resultados6.recordset.forEach(function(item) {
          continuar = false;
        });
    
    
        if (continuar){
          StrSQL="INSERT INTO transacoes (tra_conta, tra_usuario, tra_origem, tra_tipo, tra_data, tra_valor, tra_end_entrega, tra_dc) VALUES (" + conta + "," + usuario + "," + origem  +  "," + literal + " , convert(datetime, getdate(),103)," + pontos + ", 0, 'C')";
          let resultados = await connection.request().query(StrSQL);
    
          if (tipo == 1){
            //Pontos     
            StrSQL="EXEC SP_saldos_acrescimo_ponto_cad " + pontos + ", " + conta + ", '" + dataAtual + "' , 0 ";
            let resultados2 = await connection.request().query(StrSQL);
          
            StrSQL="EXEC SP_saldo_mes_cad " + conta  + ", '" + dataInicioMes +  "', " + pontos + ", 0 "
            let resultados3 = await connection.request().query(StrSQL);
          } else {
            //Bonus
            StrSQL="EXEC SP_saldos_acrescimo_ponto_cad 0, " + conta + ", '" + dataAtual + "' , " + pontos;
            console.log(StrSQL);
            let resultados4 = await connection.request().query(StrSQL);
          
            StrSQL="EXEC SP_saldo_mes_cad " + conta  + ", '" + dataInicioMes + "', 0, " + pontos;
            console.log(StrSQL);
            let resultados5 = await connection.request().query(StrSQL);
          }
          retorno.codigo = 1;
        }
        return res.status(200).json(retorno);
      }

      //Nao vai ser utilizado
      //Nao faz parte do SAO
      async extrato (req, res){
        //http://localhost:3000/extrato/18504473813
        var connection = await connectionFactory();
        let retorno = {}
        retorno.resumo = {};
        retorno.pontos = [];
        retorno.bonus = [];
        retorno.trocas = [];
        retorno.expirados = [];
        const condicao = "";
        var CPF = '18504473813';
        if (req.params.CPF){
          CPF = req.params.CPF;
        }
        

        //Resumo
        let sqlQry1 = "SELECT SUM(sal_pontos) AS pontos,";
        sqlQry1 += "SUM(sal_bonus) AS bonus,";
        sqlQry1 += "SUM(sal_premios) AS premios,";
        sqlQry1 += "SUM(sal_expirados) AS expirados ";
        sqlQry1 += "FROM dbo.saldos INNER JOIN dbo.contas ";
        sqlQry1 += "ON dbo.saldos.sal_conta = dbo.contas.con_cod ";
        sqlQry1 += "INNER JOIN dbo.entidades ON dbo.contas.con_entidade = dbo.entidades.ent_cod ";
        sqlQry1 += "WHERE (dbo.entidades.ent_doc01 = '" + CPF  + "') ";
        sqlQry1 += "and dbo.contas.con_excluido IN ('N', 'P') ";
        let resultados = await connection.request().query(sqlQry1)
        resultados.recordset.forEach(function(item) {
            retorno.resumo.acumulados =item.pontos;
            retorno.resumo.adquiridos = item.bonus;
            retorno.resumo.premios = item.premios;
            retorno.resumo.expirados = item.expirados;
            retorno.resumo.total = (item.pontos + item.bonus)-(item.premios + item.expirados);
        });
        //Pontos
        let sqlQry2 = "SELECT FORMAT (tra.tra_data, 'dd/MM/yyyy HH:mm:ss') as tra_data, tra.tra_valor, tra.tra_par01_num, tra.tra_estab, tra.tra_tipo,  cad.cad_descricao, tra.tra_txn, tra.tra_par01_texto,  tra.tra_par02_num, prc_descricao as bandeira FROM ";
        sqlQry2 += " cadastros_gerais cad INNER JOIN transacoes tra ON cad.cad_cod = tra.tra_tipo INNER JOIN contas con ON tra.tra_conta = con.con_cod  ";
        sqlQry2 += " INNER JOIN produtos_contas ON prc_cod = con.con_produto WHERE (cad.cad_par01_num in (1)) " + condicao + " AND ";
        sqlQry2 += " (con_cod IN (SELECT con_cod FROM entidades, contas WHERE ent_cod = con_entidade and (ent_doc01 = '" + CPF + "') AND con_excluido IN ('N', 'P'))) and tra.tra_valor > 0 ORDER BY tra.tra_data DESC";
        resultados = await connection.request().query(sqlQry2)
        resultados.recordset.forEach(function(item) {
            let tmp = {};
            tmp.data = item.tra_data;
            tmp.descricao = item.cad_descricao;
            tmp.tra_tipo = item.tra_tipo;
            tmp.tra_par02_num = item.tra_par02_num
            tmp.tra_texto = item.tra_par01_texto;
            tmp.tra_valor = item.tra_valor;  
            retorno.pontos.push(tmp);
        });   
        //Bonus
        let sqlQry3 = "SELECT FORMAT (tra.tra_data, 'dd/MM/yyyy HH:mm:ss') as tra_data, tra.tra_valor, tra.tra_par01_num, tra.tra_estab, tra.tra_tipo,  cad.cad_descricao, tra.tra_txn, tra.tra_par01_texto,  tra.tra_par02_num, prc_descricao as bandeira FROM ";
        sqlQry3 += " cadastros_gerais cad INNER JOIN transacoes tra ON cad.cad_cod = tra.tra_tipo INNER JOIN contas con ON tra.tra_conta = con.con_cod  ";
        sqlQry3 += " INNER JOIN produtos_contas ON prc_cod = con.con_produto WHERE (cad.cad_par01_num in (2)) " + condicao + " AND ";
        sqlQry3 += " (con_cod IN (SELECT con_cod FROM entidades, contas WHERE ent_cod = con_entidade and (ent_doc01 = '" + CPF + "') AND con_excluido IN ('N', 'P'))) and tra.tra_valor > 0 ORDER BY tra.tra_data DESC";
        resultados = await connection.request().query(sqlQry3)
        resultados.recordset.forEach(function(item) {
            let tmp = {};
            tmp.data = item.tra_data;
            tmp.descricao = item.cad_descricao;
            tmp.tra_tipo = item.tra_tipo;
            tmp.tra_par02_num = item.tra_par02_num
            tmp.tra_texto = item.tra_par01_texto;
            tmp.tra_valor = item.tra_valor;  
            retorno.bonus.push(tmp);
        });  
        
        //Trocas
        let sqlQry4 = "SELECT tri_cod, FORMAT (tri_data, 'dd/MM/yyyy HH:mm:ss') as tri_data, pro_descricao, tri_quantidade, tri_valor, cad_descricao ";
        sqlQry4 += " FROM transacoes_itens, contas, cartoes, entidades, produtos, cadastros_gerais  ";
        sqlQry4 += " WHERE ent_cod = con_entidade and con_cod = car_conta and tri_conta = con_cod  ";
        sqlQry4 += " and CON_EXCLUIDO IN ('N', 'P') AND tri_produto = pro_cod  ";
        sqlQry4 += " and cad_cod = tri_status and tri_status NOT IN (842,2081)  ";
        sqlQry4 += " and tri_transacao <> 0  AND ent_doc01 = '" + CPF + "'" + condicao;
        sqlQry4 += " ORDER BY TRI_COD DESC";
        resultados = await connection.request().query(sqlQry4)
        resultados.recordset.forEach(function(item) {
            let tmp = {};
            tmp.data = item.tri_data;
            tmp.produto = item.pro_descricao;
            tmp.quantidade = item.tri_quantidade;
            tmp.valor = item.tri_valor;
            tmp.status = item.cad_descricao;
            retorno.trocas.push(tmp);
        });  

        //A expirar
        let mes = String(moment().month() + 1);//O primeiro mes é zero.
        const ano = moment().year();
		if (mes.length == 1){
			mes = "0" + mes
		}
        const ls_data = mes + "/01/" + ano;
        const sqlQry5 = "EXEC SP_consulta_saldo_mes_cli '" + CPF + "', '" + ls_data + "'";
		resultados = await connection.request().query(sqlQry5)
        resultados.recordset.forEach(function(item) {
		        if (item.saldo_mes > 0){
                let tmp = {};
                tmp.data = item.Mes + '/' + (parseInt(item.Ano) + 1);
                tmp.valor = item.saldo_mes;
                retorno.expirados.push(tmp);
            }
        });
        return res.json(retorno);
    }
    
}    
export default new PontuacoesController();    