const request = require('request');
const util = {
    Gravar_Intervalo: async function(Projeto, Usuario, Conexao) {
        var retorno = false;
        var gs_ponto = "srdb005.ponto.dbo.";
        var StrSQL = "";
        var data_atual = "";
        var funcionario_cadastrado = false;
        var fun_cod = 0;
        var fun_intervalo1 = "";
        var ens_data = "";
        var continuar = false;
    
        StrSQL = "SELECT fun_cod, fun_intervalo1, getdate() As Data FROM " + gs_ponto + "tb_funcionario WHERE fun_codigo_sao = '" + Usuario + "' AND fun_projeto = '" + Projeto + "' AND fun_rescisao IS NULL";
        let resultados = await Conexao.request().query(StrSQL);
        resultados.recordset.forEach(function(item) {
          funcionario_cadastrado = true;
          fun_cod = item.fun_cod;
          fun_intervalo1 = item.fun_intervalo1;
          data_atual = item.Data;
        });
        if (funcionario_cadastrado){
          var ls_data_ini = data_atual + " 07:00:00";
          var ls_data_fin = data_atual + " 23:59:59";
          StrSQL = "SELECT ens_data FROM " + gs_ponto + "tb_entsai WHERE fun_cod = " + fun_cod + " AND ens_obs = 'INTERVALO' AND ens_data BETWEEN '" + ls_data_ini + "' AND '" + ls_data_fin + "' ORDER BY ens_data DESC";
          let resultados2 = await Conexao.request().query(StrSQL);
          resultados2.recordset.forEach(function(item) {
            continuar = true;
            ens_data = item.ens_data;
          });
    
          //Refatorar esta parte, apesar de funcionar pode ser melhorado
          if (continuar){
            //Os intervalos nao podem ter menos de 1 minuto
            var tmp2 = true;
            StrSQL = "SELECT fun_cod from " + gs_ponto + "tb_entsai WHERE ens_obs = 'INTERVALO' and fun_cod = " + fun_cod + " and ens_data between DATEADD(second, -20, CURRENT_TIMESTAMP) and current_timestamp";
            let resultados5 = await Conexao.request().query(StrSQL);
            resultados5.recordset.forEach(function(item) {
              tmp2 = false;
            });
            if (tmp2){
              StrSQL = "INSERT INTO " + gs_ponto + "tb_entsai (fun_cod, ens_data, ens_obs, ens_tipo, fun_cod2) VALUES(" + fun_cod + ", convert(datetime, getdate()), 'INTERVALO', 'C', 0)";
              let resultados6 = await Conexao.request().query(StrSQL);
              retorno = true;
            }
          } else {
            var tmp1 = true;
            StrSQL = "SELECT fun_cod from " + gs_ponto + "tb_entsai WHERE ens_obs = 'INTERVALO' and fun_cod = " + fun_cod + " and ens_data between DATEADD(second, -20, CURRENT_TIMESTAMP) and current_timestamp";
            let resultados3 = await Conexao.request().query(StrSQL);
            resultados3.recordset.forEach(function(item) {
              tmp1 = false;
            });
            if (tmp1){
              StrSQL = "INSERT INTO " + gs_ponto + "tb_entsai (fun_cod, ens_data, ens_obs, ens_tipo, fun_cod2) VALUES(" + fun_cod + ", convert(datetime, getdate()), 'INTERVALO', 'C', 0)";
              let resultados4 = await Conexao.request().query(StrSQL);
              retorno = true;
            }
          }
        }
        return retorno;
    },
	get: async function (url) {
		return new Promise((resolve, reject) => {
			request({ url, method: 'GET' }, (error, response, body) => {
			if (error) return reject(error)

			return resolve({ body, response })
			})
		})
	},
	post: async function (url, data) {
	  return new Promise((resolve, reject) => {
		request({ url, method: 'POST', data }, (error, response, body) => {
		  if (error) return reject(error)

		  return resolve({ body, response })
		})
	  })
	}
}

export default util