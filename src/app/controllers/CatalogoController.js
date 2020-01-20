var connectionFactory = require('../../database.js');

class CatalogoController {

    async carrinho(req, res) {
      //http://localhost:3000/carrinho_endereco/30331
        const resultado = [
            {codigo: 1, codigo_interno: "P1", produto: "Pink Printed Dress", imagem: "images/shop/thumbs/small/dress-3.jpg", valor_unitario: 19.990, quantidade: 2, total: 39.980},
            {codigo: 2, codigo_interno: "P2", produto: "Checked Canvas Shoes", imagem: "images/shop/thumbs/small/shoes-2.jpg", valor_unitario: 24.900, quantidade: 1, total: 24.990},
            {codigo: 3, codigo_interno: "P3", produto: "Blue Men Tshirt", imagem: "images/shop/thumbs/small/tshirt-2.jpg", valor_unitario: 13.990, quantidade: 3, total: 41.970}
          ]
        return res.status(200).json(resultado);
    }    
    async carrinho_endereco(req, res) {
        var entidade = 0;
        if (req.params.entidade){
          entidade = req.params.entidade;
        }
        const modelo = {
            codigo: 1,
            endereco: "Rua X",
            numero: "10",
            complemento: "10",
            bairro: "Bairro Y",
            cidade: "São Paulo",
            estado: "SP",
            CEP: "00000000"
          }
          var connection = await connectionFactory();
          try{
              var resultados = await connection.request().query("select top 1 end_cod as codigo,  end_rua as endereco, end_numero as numero, end_compl as complemento, end_bairro as bairro, end_cidade as cidade, end_estado as estado, end_cep as CEP from enderecos, cadastros_gerais where end_tipo = cad_cod and end_excluido <> 'S' and end_tipo = 32 and end_entidade = " + entidade);
              return res.status(200).json(resultados.recordset);
             } catch(err){
                return res.status(500).json({status: 'erro', detalhes: err}); 
             }
    }    
    async produto(req, res) {
        var codigo = 0;
        if (req.params.codigo){
          codigo = req.params.codigo;
        }
        const modelo = {
            codigo: 1,
            codigo_interno: "P1",
            categoria: "Vestuário",
            imagem: "images/shop/dress/1.jpg",
            imagem2: "images/shop/dress/1-1.jpg",
            produto: "Checked Short Dress",
            pontos: 24.99,
            codigo_categoria: 1,
            pontos_desconto: 21,
            descricao:
              "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Libero velit id eaque ex quae laboriosam nulla optio doloribus! Perspiciatis, libero, neque, perferendis at nisi optio dolor!<BR>Perspiciatis ad eveniet ea quasi debitis quos laborum eum reprehenderit eaque explicabo assumenda rem modi."
          }
          var connection = await connectionFactory();
          try{
              var resultados = await connection.request().query("select top 1 pro_cod as codigo, pro_cod_ext1 as codigo_interno, cad_descricao as categoria, pro_categoria as codigo_categoria, pro_espec as descricao, 'http://www.teste.com.br/catalogo/padrao/' + reverse(left(reverse(dop_caminho), CHARINDEX('\\', reverse(dop_caminho))-1)) as imagem, 'http://www.teste.com.br/catalogo/padrao/' + reverse(left(reverse(dop_caminho), CHARINDEX('\\', reverse(dop_caminho))-1)) as imagem2, pro_descricao as produto, pro_valor as pontos, isnull((SELECT TOP 1 cast(pro_valor * (1-(prd_desconto/100)) as int) FROM produtos_desconto, produtos WHERE prd_cod_prod = pro_cod and pro_cod = P.pro_cod order by prd_prioridade),pro_valor) as pontos_desconto from produtos as P, documentos_produtos, cadastros_gerais where P.pro_cod = dop_produto and pro_categoria = cad_cod and P.pro_status = 872 and P.pro_valor > 0 and pro_cod = " + codigo);
              return res.status(200).json(resultados.recordset);
             } catch(err){
                return res.status(500).json({status: 'erro', detalhes: err}); 
             }
    }    
    async categorias(req, res) {
        const modelo = [
            { codigo: 1, titulo: "Anúncio em Mídia" },
            { codigo: 2, titulo: "Cápsulas E Acessórios" },
            { codigo: 3, titulo: "Cursos e Consultorias" },
            { codigo: 4, titulo: "Eletrônicos" },
            { codigo: 5, titulo: "Eletroportáteis" },
            { codigo: 6, titulo: "Ferramentas" },
            { codigo: 7, titulo: "Informação e Cultura" },
            { codigo: 8, titulo: "Informática" },
            { codigo: 9, titulo: "Materiais De Escritório" },
            { codigo: 10, titulo: "Produtos personalizados" },
            { codigo: 11,titulo: "Recarga de celular" },
            { codigo: 12,titulo: "Serviços" },
            { codigo: 13,titulo: "Serviços de Mercado" },
            { codigo: 14,titulo: "Telefonia" },
            { codigo: 15,titulo: "Volta às Aulas" }
          ]
          var connection = await connectionFactory();
          try{
            var resultados = await connection.request().query("SELECT cad_cod as codigo, cad_descricao as titulo FROM dbo.cadastros_gerais WHERE cad_ativo = 1 and cad_cod in (select pro_categoria from produtos where pro_status = 872) order by cad_descricao");
              return res.status(200).json(resultados.recordset);
          } catch(err){
              return res.status(500).json({status: 'erro', detalhes: err}); 
          }
    }    
    async catalogo(req, res) {
        const modelo = [
            {
              codigo: 1,
              codigo_interno: "P1",
              imagem: "images/shop/dress/1.jpg",
              imagem2: "images/shop/dress/1-1.jpg",
              produto: "Checked Short Dress",
              pontos: 24.99,
              pontos_desconto: 21
            },
            {
              codigo: 2,
              codigo_interno: "P2",
              imagem: "images/shop/pants/1-1.jpg",
              imagem2: "images/shop/pants/1.jpg",
              produto: "Slim Fit Chinos",
              pontos: 39.99,
              pontos_desconto: 21
            },
            {
              codigo: 4,
              codigo_interno: "P4",
              imagem: "images/shop/dress/2.jpg",
              imagem2: "images/shop/dress/2-2.jpg",
              produto: "Light Blue Denim Dress",
              pontos: 19.95,
              pontos_desconto: 18
            },
            {
              codigo: 5,
              codigo_interno: "P5",
              imagem: "images/shop/dress/1.jpg",
              imagem2: "images/shop/dress/1-1.jpg",
              produto: "Checked Short Dress",
              pontos: 24.99,
              pontos_desconto: 21
            },
            {
              codigo: 6,
              codigo_interno: "P6",
              imagem: "images/shop/pants/1-1.jpg",
              imagem2: "images/shop/pants/1.jpg",
              produto: "Slim Fit Chinos",
              pontos: 39.99,
              pontos_desconto: 30
            },
            {
              codigo: 3,
              codigo_interno: "P3",
              imagem: "images/shop/dress/2.jpg",
              imagem2: "images/shop/dress/2-2.jpg",
              produto: "Light Blue Denim Dress",
              pontos: 19.95,
              pontos_desconto: 15
            },
            {
              codigo: 7,
              codigo_interno: "P7",
              imagem: "images/shop/dress/1.jpg",
              imagem2: "images/shop/dress/1-1.jpg",
              produto: "Checked Short Dress",
              pontos: 24.99,
              pontos_desconto: 20
            },
            {
              codigo: 8,
              codigo_interno: "P8",
              imagem: "images/shop/pants/1-1.jpg",
              imagem2: "images/shop/pants/1.jpg",
              produto: "Slim Fit Chinos",
              pontos: 39.99,
              pontos_desconto: 30
            },
            {
              codigo: 9,
              codigo_interno: "P9",
              imagem: "images/shop/dress/2.jpg",
              imagem2: "images/shop/dress/2-2.jpg",
              produto: "Light Blue Denim Dress",
              pontos: 19.95,
              pontos_desconto: 15
            },
            {
              codigo: 10,
              codigo_interno: "P10",
              imagem: "images/shop/dress/1.jpg",
              imagem2: "images/shop/dress/1-1.jpg",
              produto: "Checked Short Dress",
              pontos: 24.99,
              pontos_desconto: 21
            },
            {
              codigo: 11,
              codigo_interno: "P11",
              imagem: "images/shop/pants/1-1.jpg",
              imagem2: "images/shop/pants/1.jpg",
              produto: "Slim Fit Chinos",
              pontos: 39.99,
              pontos_desconto: 30
            },
            {
              codigo: 12,
              codigo_interno: "P12",
              imagem: "images/shop/dress/2.jpg",
              imagem2: "images/shop/dress/2-2.jpg",
              produto: "Light Blue Denim Dress",
              pontos: 19.95,
              pontos_desconto: 15
            }
          ]
		  var retorno = {};
		  var filtro = "";
		  var registro_inicial = 1;
		  var registro_final = 12;
		  var tamanho_pagina = 12;
		  var total_registros = 0;
		  var total_paginas = 0;
		  var criterio_ordenacao = "ORDER by pro_valor";
		  var pagina = 1;
		  var pon = "";
		  var ordenar = "";
	
		  if (req.query.cat){
			  if (req.query.cat !== "" && req.query.cat !== "0"){
				filtro = " and pro_categoria = " + req.query.cat;
			  }
		  }
		  if (req.query.pesquisar){
			  if (req.query.pesquisar !== ""){
				var numbers = /^[0-9]+$/;
				if(criterio.match(numbers)){				
					filtro += " and pro_cod_ext1 = '" + req.query.pesquisar + "' ";	
				} else {
					filtro += " and pro_descricao like '%" + req.query.pesquisar + "%' ";	
				}
			  }	
		  }
		  if (req.query.pagina){
			  if (req.query.pagina !== ""){
				pagina =  req.query.pagina;
			  }
		  }
		  if (req.query.pon){
			  if (req.query.pon !== ""){
				pon =  req.query.pon;
			  }
		  }
		  if (req.query.ordenar){
			  if (req.query.ordenar !== ""){
				ordenar =  req.query.ordenar;
			  }
		  }
		  if (pon !== ""){
			switch (pon) {
				case "1": //Até 1000 pontos
					filtro += " and pro_valor between 0 and 1000";
					break;  
				case "2": //De 1001 a 3.500 pontos
					filtro += " and pro_valor between 1001 and 3500";
					break; 
				case "3": //A partir de 3.501 pontos
					filtro += " and pro_valor between 3501 and 999999";
					break;
				} 	
		  }
		  
		  if (ordenar !== ""){
			switch (ordenar) {
				case "1": 
					criterio_ordenacao= " ORDER by pro_descricao";
					break;  
				case "2": //De 1001 a 3.500 pontos
					criterio_ordenacao= " ORDER by pro_valor";
					break; 
				case "3": //A partir de 3.501 pontos
					criterio_ordenacao= " ORDER by pro_valor DESC";
					break;
				} 	
		  }
	
		  if (pagina==1){
			registro_inicial = 1;
			registro_final = 12;
		  } else {
			 registro_inicial = ((pagina-1) * tamanho_pagina)+1;
             registro_final = (registro_inicial + tamanho_pagina)-1;
		  }
		  
          var connection = await connectionFactory();
		  
		  let sqlQry1 = "select count(pro_cod) as total from produtos "; 
		  sqlQry1 += " WHERE pro_tipo <> 1960 and pro_categoria not in (34182) ";
		  sqlQry1 += " and pro_status in (872) and pro_dependente = 0  and  pro_valor > 1 " + filtro;
		  let resultados2 = await connection.request().query(sqlQry1)
		  resultados2.recordset.forEach(function(item2) {
			 total_registros = item2.total; 
		  });
		  
		  if (total_registros % tamanho_pagina ==0){
			 total_paginas = parseInt(total_registros / tamanho_pagina);
		  } else {
			  total_paginas = parseInt(total_registros / tamanho_pagina)+1;
          }
		  
		 retorno.registros = [];
		 retorno.pagina = pagina;
		 retorno.paginas = total_paginas;
		 retorno.produto_inicial = registro_inicial;
		 retorno.produto_final = registro_final;
		 retorno.registros = [];
		  
          try{
			  var StrSQL = "select * from (select pro_cod as codigo, pro_cod_ext1 as codigo_interno, 'http://www.teste.com.br/catalogo/padrao/' + reverse(left(reverse(dop_caminho), CHARINDEX('\\', reverse(dop_caminho))-1)) as imagem, 'http://www.teste.com.br/catalogo/padrao/' + reverse(left(reverse(dop_caminho), CHARINDEX('\\', reverse(dop_caminho))-1)) as imagem2, pro_descricao as produto, pro_valor as pontos, isnull((SELECT TOP 1 cast(pro_valor * (1-(prd_desconto/100)) as int) FROM produtos_desconto, produtos WHERE prd_cod_prod = pro_cod and pro_cod = P.pro_cod order by prd_prioridade),pro_valor) as pontos_desconto, row_number() over(" + criterio_ordenacao + ")  as rn from produtos as P, documentos_produtos where P.pro_cod = dop_produto and P.pro_status = 872 and P.pro_valor > 1 and pro_dependente = 0 " + filtro + ") as x where rn between " + registro_inicial + " and  " + registro_final;
              var resultados = await connection.request().query(StrSQL);
			  retorno.registros = resultados.recordset;
			  return res.status(200).json(retorno);
             } catch(err){
                return res.status(500).json({status: 'erro', detalhes: err}); 
             }
    }
    
    //Programacao já testada retirada de outra API
    async produto_original (req, res){
      //http://localhost:3000/produto2/30331
      var connection = await connectionFactory();
      let retorno = {}
      const CPF = '29036706840';
      var codigo_produto = 0;
      if (req.params.codigo){
        codigo_produto = req.params.codigo;
      }
      //const codigo_produto = 30319;
      if (req.params.produto){
        codigo_produto = req.params.produto;
      }
      const fator = 1;
      let produto_localizado = false;
      let sqlQry1 = "SELECT pro_cod, pro_cod_ext1, (pro_valor * " + fator + ") as pro_valor, pro_categoria, pro_espec, PRO_ESPEC_HTML, pro_descricao, pro_status, pro_descricao + ' - ' + ISNULL(MA.f059_descricao,'') + ' ' + ISNULL(MO.F059_DESCRICAO,'') AS PRO_NOVA_DESCRICAO, ";
      sqlQry1 += " (SELECT top 1 reverse(left(reverse(dop_caminho), CHARINDEX('\\', reverse(dop_caminho))-1)) AS X ";
      sqlQry1 += "  from documentos_produtos where dop_produto = P.pro_cod) as imagem, f004_vlEcommerce ";
      sqlQry1 += "  from PRODUTOS as P ";
      sqlQry1 += "  left join srdb005.gerencial.dbo.f004 ";
      sqlQry1 += "  on pro_cod_ext1 = f004_cdref01 ";
      sqlQry1 += "  left join srdb005.gerencial.dbo.f059 MA ";
      sqlQry1 += "  on f004_marca = MA.f059_codigo and MA.f059_tipo = 0 ";
      sqlQry1 += "  LEFT join srdb005.gerencial.dbo.f059 MO ";
      sqlQry1 += "  ON F004_MODELO = MO.F059_CODIGO ";
      sqlQry1 += "  WHERE PRO_COD = " + codigo_produto;
      sqlQry1 += "  and pro_status in (872, 874, 6101)"; 
      //console.log(sqlQry1);

      const sqlQry2 = "SELECT TOP 1 prd_desconto FROM produtos_desconto WHERE prd_cod_prod = " + codigo_produto + " AND prd_dtinicio < CONVERT(DATETIME, GETDATE(), 103) AND prd_dttermino > CONVERT(DATETIME, GETDATE(), 103) order by prd_prioridade";
      const sqlQry3 = "select ent_cod, ent_email, con_status from entidades, contas where ent_cod = con_entidade and ent_doc01 = '" + CPF + "'";
      let resultados =  await connection.request().query(sqlQry1)
      resultados.recordset.forEach(function(item) {
          produto_localizado = true;
          retorno.status = resultados.recordset[0].pro_status;
          retorno.imagem = 'http://www.teste.com.br/catalogo/padrao/' + resultados.recordset[0].imagem;
          retorno.valor = resultados.recordset[0].pro_valor;
          retorno.codigo = resultados.recordset[0].pro_cod;
          
          retorno.codigo_externo = resultados.recordset[0].pro_cod_ext1;
          retorno.descricao = resultados.recordset[0].PRO_NOVA_DESCRICAO;
          retorno.categoria = resultados.recordset[0].pro_categoria;
          retorno.especificacao = resultados.recordset[0].PRO_ESPEC_HTML;
      });

      if (produto_localizado){
          resultados = await connection.request().query(sqlQry2)
          resultados.recordset.forEach(function(item) {
              let fator_desconto = item.prd_desconto/100;
              fator_desconto = 1 - fator_desconto;
              let novo_preco =  retorno.valor * fator_desconto;  
              retorno.valor_com_desconto = novo_preco;
          });
          
          resultados = await connection.request().query(sqlQry3)
          resultados.recordset.forEach(function(item) {
              if (item.con_status == "36"){
                  retorno.pode_trocar = "SIM";
              } else {
                  retorno.pode_trocar = "NAO";
              }
              if (item.email == "" || item.email === null || item.email ===undefined){
                  retorno.possui_email = "NAO";
              } else {
                  retorno.possui_email = "SIM";
              }
          });    
      }
      return res.json(retorno);
  }

  async catalogo_original (req, res){
    var connection = await connectionFactory();
    let retorno = {}
    retorno.total_registros = 0;
    retorno.pagina = 1;
    retorno.paginas = 0;
    retorno.produto_inicial = 0;
    retorno.produto_final = 0;
    retorno.registros = [];
    let fator  = 1;
    let filtro_pagina = ""; 
    let criterio_especial = ""; 
    let filtro_tipo_cliente = "";
    let registro_inicial = 1;
    let registro_final = 24;
    let tamanho_pagina = 24;
    let total_paginas = 0;
    let criterio_ordenacao = "ORDER by pro_valor, pro_cod_ext2";
    let vmin = 0;
    let vmax = 0;
    let pagina = 1;
    let cat = "";
    let nome = "";
    let pon = "";
    let pesquisa = "";
    let ordem = "";
    let especial = "";
    let produto_inicial = 0;
    let produto_final = 0;
    let total_registros = 0;
    //Recuperando as variaveis
  if (req.body.pagina){
    pagina = req.body.pagina;
  }
    if (req.body.cat){
        cat= req.body.cat;
    } 
    if (req.body.nome){
        nome = req.body.nome;
    }
    if (req.body.pon){
        pon = req.body.pon;
    }
    if (req.body.pesquisa){
         pesquisa = req.body.pesquisa;
    }
    if (req.body.ordem){
        ordem =req.body.ordem;
    }
    if (req.body.especial){
        especial =req.body.especial;
    }

    retorno.pagina = pagina;
    //console.log(req.body);

    if (ordem != ""){
        switch (ordem) {
            case "1": //Por pontuação decrescente, :
            criterio_ordenacao=" ORDER by pro_valor DESC";
            break;
            case "2": //Por pontuação crescente, :
            criterio_ordenacao=" ORDER by pro_valor";
            break;
            case "3": //Produtos mais novos:
            criterio_ordenacao=" ORDER by pro_data_cad desc";
            break;
        } 
    }

    if (pon != ""){
        switch (pon) {
            case "1": //Até 1000 pontos
            criterio_ordenacao=" ORDER by pro_valor";
            vmin=0;
            vmax=1000;
            break;  
            case "2": //De 1001 a 3.500 pontos
            criterio_ordenacao=" ORDER by pro_valor";
            vmin=1001;
            vmax=3500;
            break; 
            case "3": //A partir de 3.501 pontos
            criterio_ordenacao=" ORDER by pro_valor";
            vmin=3501;
            vmax=99999;
            break;
        } 		  
    }

    if (cat != ""){
        //Filtrou por categoria
        filtro_pagina = " and pro_categoria = " + cat;
    }

    if (pesquisa !=  ""){
        filtro_pagina = " AND (pro_descricao LIKE '%" + pesquisa + "%') ";
    }  

    if (vmin > 0){
        if (vmax > 0){
            filtro_pagina = " and pro_valor between " + vmin + " and " + vmax;
        }
    }

    //Total de Registros
    let sqlQry1 = "select count(pro_cod) as total from produtos "; 
    sqlQry1 += " WHERE pro_tipo <> 1960 and pro_categoria not in (34182) ";
    sqlQry1 += " and pro_status in (872, 6101) and pro_dependente = 0  ";
    sqlQry1 += " and pro_cod_ext1 <> '99999' " + filtro_pagina +  criterio_especial + filtro_tipo_cliente;
    let resultados = await connection.request().query(sqlQry1)
    resultados.recordset.forEach(function(item) {
        retorno.total_registros = item.total; 
        total_registros = item.total;
    });

    //Paginacao
    if (pagina==1){
        registro_inicial = 1;
        registro_final = 12;
    } else {
        registro_inicial = ((pagina-1) * tamanho_pagina)+1;
        registro_final = (registro_inicial + tamanho_pagina)-1;
    }
    
    if (total_registros % tamanho_pagina ==0){
        total_paginas = parseInt(total_registros / tamanho_pagina);
    } else {
        total_paginas = parseInt(total_registros / tamanho_pagina)+1;
    }

    if (parseInt(pagina)==1){
      produto_inicial=1;
      if ((parseInt(total_registros)<12)) {
        produto_final = total_registros;
      } else {
        produto_final=12;
      } 
    } else {
      produto_inicial=((parseInt(pagina)-1)*parseInt(tamanho_pagina))+1;
      produto_final=parseInt(produto_inicial)+(parseInt(tamanho_pagina)-1);

      if ((parseInt(produto_final)>parseInt(total_registros))) {
        produto_final=total_registros;
      } 
    } 

    retorno.paginas = total_paginas;
    retorno.produto_inicial = produto_inicial;
    retorno.produto_final = produto_final;

    //Pagina selecionada;
    let sqlQry2 = "select * from (";
  sqlQry2 += "SELECT pro_cod, pro_cod_ext1, pro_par03_texto, pro_cod_ext2, pro_descricao, pro_categoria, (pro_valor * " + fator + ") as pro_valor, pro_gatilho,  pro_descricao + ' - ' + ISNULL(MA.f059_descricao,'') + ' ' + ISNULL(MO.F059_DESCRICAO,'') AS PRO_NOVA_DESCRICAO,f004_vlEcommerce,";
  sqlQry2 += "(SELECT top 1 reverse(left(reverse(dop_caminho), CHARINDEX('\\', reverse(dop_caminho))-1)) AS X ";
    sqlQry2 += " from documentos_produtos where dop_produto = P.pro_cod) as imagem, ";
    sqlQry2 += " (SELECT TOP 1 prd_desconto FROM produtos_desconto WHERE prd_cod_prod = P.pro_cod AND prd_dtinicio < CONVERT(DATETIME, GETDATE(), 103) AND prd_dttermino > CONVERT(DATETIME, GETDATE(), 103) order by prd_prioridade) as fator_desconto_produto, ";
  sqlQry2 += " row_number() over(" + criterio_ordenacao + ")  as rn, pro_data_cad ";
  sqlQry2 += " FROM  dbo.produtos as P ";
  sqlQry2 += " left join srdb005.gerencial.dbo.f004 ";
  sqlQry2 += " on pro_cod_ext1 = f004_cdref01 ";
  sqlQry2 += " left join srdb005.gerencial.dbo.f059 MA ";
  sqlQry2 += " on f004_marca = MA.f059_codigo and MA.f059_tipo = 0 ";
  sqlQry2 += " LEFT join srdb005.gerencial.dbo.f059 MO ";
  sqlQry2 += " ON F004_MODELO = MO.F059_CODIGO ";
  sqlQry2 += " WHERE pro_tipo <> 1960 and pro_categoria not in (34182)  and pro_status in (872, 6101) and pro_dependente = 0 " + filtro_pagina  + criterio_especial + filtro_tipo_cliente;   
    sqlQry2 += ") as x where rn between " + registro_inicial + " and  " + registro_final + criterio_ordenacao;
    resultados = await connection.request().query(sqlQry2)
    resultados.recordset.forEach(function(item) {
        let tmp = {}
       tmp.categoria = item.pro_categoria;
       tmp.valor = item.pro_valor;
       tmp.imagem = 'http://www.teste.com.br/catalogo/padrao/' + item.imagem;
       tmp.codigo = item.pro_cod;
       tmp.marcacao = item.pro_par03_texto;
       tmp.nome = item.pro_descricao;
       tmp.valor_com_desconto = 0;
       if (item.fator_desconto_produto == 'null' || item.fator_desconto_produto == '' || item.fator_desconto_produto === null || item.fator_desconto_produto ===undefined){
            //Sem desconto
            tmp.valor_com_desconto = item.pro_valor;
       } else {
            let fator_desconto = item.fator_desconto_produto/100;
            fator_desconto = 1 - fator_desconto;
            let novo_preco =  retorno.valor * fator_desconto;  
            tmp.valor_com_desconto = novo_preco;
       } 

       retorno.registros.push(tmp);        
    });
    return res.status(200).json(retorno);
}

async adicionar_produto(req, res) {
      //request
	  //{
      //"CPF": "18504473813",
   	  //"produto": "902016324",
      //"quantidade": 1
      //}
	  const projeto = "2136863";
	  var retorno = {}
	  var CPF = "";
	  var produto = "";
	  var quantidade = 1;
	  var total_troca = 0;
	  var codigo_produto = 0;
	  var pro_cod_cad_unico = 0;
	  var saldo = 0;
	  var total_trocas = 0;
	  var troca_valida = true;
	  var produto_promocao = false;
	  var StrSQL = "";
	  
	  if (req.body.produto){
        produto = req.body.produto;
      }
      if (req.body.quantidade){
        quantidade = req.body.quantidade;
      }
      if (req.body.CPF){
        CPF = req.body.CPF;
      }
	  var connection = await connectionFactory();
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
		total_troca = item.pro_valor * quantidade;
		pro_cod_cad_unico = item.pro_cod_cad_unico;
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
			  retorno.status = "O ESTOQUE DESTE PRODUTO ACABOU";
		  }
	  }
	  
	  if (troca_valida){
		  //Verificar se possui e-mail
		  StrSQL = "SELECT ent_cod, ent_nome, ent_email, ent_email_capt, ent_doc01, con_cod ";
		  StrSQL += " FROM entidades, contas ";
		  StrSQL += " WHERE ent_cod = con_entidade ";
		  StrSQL += " and ent_doc01 = '" + CPF + "' ";
		  let dados_cliente = await connection.request().query(StrSQL);
		  dados_cliente.recordset.forEach(function(item) {
			  if (item.ent_email == 'null' || item.ent_email == '' || item.ent_email === null || item.ent_email ===undefined){
				troca_valida = false;
				retorno.status = "O CLIENTE NAO POSSUI E-MAIL";
			  } 
		  });
		  
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
		  
		  //Sao permitidas apenas 5 trocas do produto por mes.
		  
		   StrSQL = "SELECT sum(tri_quantidade) as total from transacoes_itens where tri_produto = " + codigo_produto + " and tri_status not in (842, 2685) and month(tri_data) = month(getdate()) and year(tri_data) = year(getdate()) and tri_conta in (select con_cod from contas, entidades where ent_cod = con_entidade and ent_doc01 = '" + CPF + "')";
		   let dados_trocas = await connection.request().query(StrSQL);
		   dados_trocas.recordset.forEach(function(item) {
			   total_trocas = item.total;
		   });

		   if (parseInt(quantidade) > parseInt(total_trocas)){
			   troca_valida = false;
			   retorno.status = "ULTRAPASSOU O LIMITE DE TROCAS NO MES";
		   }
    }  

	if (troca_valida){
		retorno.status = "OK";
	}
	return res.status(200).json(retorno);
	
}  

}
export default new CatalogoController();