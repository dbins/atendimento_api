# API - Sistema Atendimento

Este é o backend feito em NodeJS + Express com banco de dados SQL Server do Sistema de Atendimento feito em React JS.

![Backend](imagem/backend.png)

## Recursos Utilizados

- NodeJS
- Express
- Mssql
- Axios
- Helmet
- Jsonwebtoken
- Morgan
- Winston

Não foi utilizado nenhum ORM neste projeto, já que as consultas foram refatoradas e migradas de uma aplicação existente feita com outra tecnologia. Desta forma, também não existem migrations.

O objetivo desta API foi num primeiro momento extrair as consultas ao banco do sistema legado, para poder testar a navegação do protótipo do novo sistema feito em ReactJS. Numa segunda etapa, o banco seria refatorado para simplificar processos, já que o sistema original é antigo.

Existe um arquivo docker-compose para subir a API num container.

Faltou fazer o arquivo de ambiente com as configurações do banco (.env) e ativar a restrição para algumas rotas somente serem consultadas por usuários autenticados. A programação de gerar o token já existe e o middleware para receber o token no cabeçalho das requisições (Bearer) também está pronto.

## Controllers

Existem 6 controladores responsáveis por atender as 77 rotas desta API

| Nome                     | Descrição                                                               |
| ------------------------ | ----------------------------------------------------------------------- |
| AcoesController.js       | Criar ação, listar perguntas e opções de respostas                      |
| CadastroController.js    | Cadastro do cliente, endereço, telefone, log e histórico de atendimento |
| CatalogoController.js    | Catálogo de produtos, detalhe do produto e gravar troca                 |
| OcorrenciasController.js | Ocorrências do cliente, criar ocorrência                                |
| OperacionalController.js | Login do operador, combos do sistema, motivos de atendimento            |
| PontuacoesController.js  | Pontos acumulados, validades, expirados, pontuação manual               |
