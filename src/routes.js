import { Router } from "express";
import CadastroController from "./app/controllers/CadastroController.js";
import CatalogoController from "./app/controllers/CatalogoController.js";
import PontucacoesController from "./app/controllers/PontuacoesController.js";
import OcorrenciasController from "./app/controllers/OcorrenciasController.js";
import OperacionalController from "./app/controllers/OperacionalController.js";
import AcoesController from "./app/controllers/AcoesController.js";
import authMiddleware from "./app/middlewares/auth";

const routes = new Router();

// Cadastro
//Todas as rotas testadas
routes.get("/entidade/:codigo", CadastroController.entidade);
routes.post("/entidades_pesquisar", CadastroController.entidades_pesquisar);
routes.get("/acoes/:entidade", CadastroController.acoes);
routes.get("/contatos/:entidade", CadastroController.contatos);
routes.get("/historico/:entidade", CadastroController.historico);
routes.get("/log/:entidade", CadastroController.log);
routes.get("/resgates/:entidade", CadastroController.resgates);
routes.get("/sms/:entidade", CadastroController.sms);
routes.get("/endereco/:entidade", CadastroController.endereco);
routes.get("/telefone/:entidade", CadastroController.telefone);
routes.post("/telefone_inserir", CadastroController.telefone_inserir);
routes.post("/endereco_inserir", CadastroController.endereco_inserir);

//Rotas testadas, /carrinho não vai ser utilizada
routes.get("/carrinho", CatalogoController.carrinho);
routes.get("/carrinho_endereco/:entidade", CatalogoController.carrinho_endereco);
routes.get("/produto/:codigo", CatalogoController.produto);
routes.get("/categorias", CatalogoController.categorias);
routes.get("/catalogo", CatalogoController.catalogo);
routes.post("/adicionar_produto", CatalogoController.adicionar_produto);
//Rotas com mais informacoes
//As duas rotas abaixo deveriam ser usadas como POST
routes.get("/produto2/:codigo", CatalogoController.produto_original);
routes.get("/catalogo2", CatalogoController.catalogo_original);


routes.get("/contas/:entidade", PontucacoesController.contas);
routes.get("/cartoes/:entidade", PontucacoesController.cartoes);
routes.get("/saldo/:entidade", PontucacoesController.saldo);
routes.get("/pontos/:entidade", PontucacoesController.pontos);
routes.get("/bonus/:entidade", PontucacoesController.bonus);
routes.get("/validades/:entidade", PontucacoesController.validades);
routes.get("/expirados/:entidade", PontucacoesController.expirados);
routes.post("/pontuacao_manual", PontucacoesController.pontuacao_manual);
//Nao vai ser utilizado porque não é parte do SAO - Rota de resumo
routes.get("/extrato/:CPF", PontucacoesController.extrato);

//Rotas testadas
routes.post("/ocorrencias", OcorrenciasController.ocorrencias);
routes.get("/ocorrencias_assunto/:tipo", OcorrenciasController.ocorrencias_assunto);
routes.get("/ocorrencias_status", OcorrenciasController.ocorrencias_status);
routes.get("/ocorrenciasEncaminhada", OcorrenciasController.ocorrenciasEncaminhada);
routes.get("/ocorrencias_tipo", OcorrenciasController.ocorrencias_tipo);
routes.get("/ocorrencias_total/:usuario", OcorrenciasController.ocorrencias_total);
routes.get("/ocorrencia/:codigo", OcorrenciasController.ocorrencia);
routes.post("/ocorrencia_gravar", OcorrenciasController.ocorrencia_gravar);
routes.post("/ocorrencia_item_gravar", OcorrenciasController.ocorrencia_item_gravar);

//Rotas operacionais
//Com exceção de discador e pausa, demais OK
routes.get("/scripts", OperacionalController.scripts);
routes.get("/pausa/:operador", OperacionalController.pausa);
routes.get("/pausa_tipo", OperacionalController.pausa_tipo);
routes.post("/discador", OperacionalController.discador);
routes.get("/motivos", OperacionalController.motivos);
routes.get("/endereco_tipo", OperacionalController.endereco_tipo);
routes.get("/telefone_tipo", OperacionalController.telefone_tipo);
routes.get("/cargos", OperacionalController.cargos);
routes.get("/estadocivil", OperacionalController.estadocivil);
routes.get("/sexo", OperacionalController.sexo);
routes.get("/CEP/:cep", OperacionalController.CEP);
routes.get("/rastreio/:codigo", OperacionalController.rastreio);
routes.post("/login", OperacionalController.login);
routes.post("/historico_gravar", OperacionalController.historico_gravar);
routes.post("/motivo_gravar", OperacionalController.motivo_gravar);
routes.post("/pausa_iniciar", OperacionalController.pausa_iniciar);
routes.post("/pausa_finalizar", OperacionalController.pausa_finalizar);
routes.post("/finalizapedido", OperacionalController.finalizapedido);

routes.get("/acoes_config", AcoesController.acoes_config);
routes.get("/pontuacoes", AcoesController.pontuacoes);
routes.get("/cadastros_gerais", AcoesController.cadastros_gerais);
routes.get("/combos/:tipo", AcoesController.combos);
routes.get("/perguntas/:acao", AcoesController.perguntas);
routes.get("/opcoes/:pergunta", AcoesController.opcoes);
routes.post("/cadastros_gerais_atualizar", AcoesController.cadastros_gerais_atualizar);
routes.post("/cadastros_gerais_inserir", AcoesController.cadastros_gerais_inserir);
routes.get("/cadastros_gerais_excluir/:codigo", AcoesController.cadastros_gerais_excluir);
routes.post("/opcoes_atualizar", AcoesController.opcoes_atualizar);
routes.post("/opcoes_inserir", AcoesController.opcoes_inserir);
routes.get("/opcoes_excluir/:codigo", AcoesController.opcoes_excluir);
routes.get("/perguntas_excluir/:codigo", AcoesController.perguntas_excluir);
routes.post("/perguntas_atualizar", AcoesController.perguntas_atualizar);
routes.post("/perguntas_inserir", AcoesController.perguntas_inserir);
routes.get("/acao/:codigo", AcoesController.acao);
routes.post("/acoes_adicionar", AcoesController.acoes_adicionar);
routes.post("/acoes_atualizar", AcoesController.acoes_atualizar);
routes.get("/pesquisa/:acao", AcoesController.pesquisa);
routes.post("/pesquisa_responder", AcoesController.pesquisa_responder);
routes.post("/respostas", AcoesController.respostas);

// autenticação do token através do middleware de autenticação
//routes.use(authMiddleware); // rotas abaixo todas tem que passar pela autenticação

//Criar as seguintes rotas:





export default routes;