const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const connection = require("./database/database");
const Pergunta = require("./database/Pergunta")

//Fazendo a conexao com o banco de dados
connection
    .authenticate()
    .then(() => { //Se o banco for autenticado vou executar algo posteriormente
        console.log("Conexao feita com banco de dados!")
    })
    .catch((msgErro) => {
        console.log("Erro na conexao com o banco de dados!")
    });

//Estou dizendo ao express para usar o ejs como view engine
app.set('view engine', 'ejs');
//Estou dizendo ao express que vou carregar arquivos estaticos
app.use(express.static('public'));

//Decodificar os dados enviados pelo usuario no formulario
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//Rota utilizando o metodo render do ejs
app.get("/", (req, res) => {
    //Definindo as variaveis que serao exibidas no html
    res.render("index");
});

//Rota utilizando o metodo render do ejs
app.get("/perguntar", (req, res) => {
    res.render("perguntar");
});

//Rota que recebe o formulario do html
app.post("/salvarpergunta", (req, res) => {
    var titulo = req.body.titulo;  //Recebo os dados do formulário e salvo dentro das variaveis
    var descricao = req.body.descricao;
    //Faço um insert na minha tabela perguntas passando os dados do formulario
    Pergunta.create({
        titulo: titulo,
        descricao: descricao
    }).then(() => {//Caso de certo redirecionando para a pagina principal
        res.redirect("/");
    });
});

//Criando o server com express na porta 4000
app.listen(4000, () => {
    console.log("App online.")
});