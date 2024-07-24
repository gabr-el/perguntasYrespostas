const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const connection = require("./database/database");
const Pergunta = require("./database/Pergunta");
const Resposta = require("./database/Resposta");
const { where } = require("sequelize");

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

//Essa rota tras todas as perguntas do bd
app.get("/", (req, res) => {
    Pergunta.findAll({
        raw: true, order: [//O atributo raw : true diz que quero as informacoes de forma resumida
            ['id', 'DESC'] //O atributo order define o parametro e como ele será ordenado
        ]
    }).then(perguntas => {
        res.render("index", {
            perguntas: perguntas
        });
    })

});

//Rota utilizando o metodo render do ejs
app.get("/perguntar", (req, res) => {
    res.render("perguntar");
});

//Rota que recebe os campos do formulario html
app.post("/salvarpergunta", (req, res) => {
    var titulo = req.body.titulo;  //Recebo os dados do formulário e salvo dentro das variaveis
    var descricao = req.body.descricao;
    console.log(titulo);
    console.log(descricao);
    //Faço um insert na minha tabela perguntas passando os dados do formulario
    Pergunta.create({
        titulo: titulo,
        descricao: descricao
    }).then(() => {
        res.redirect("/");
    });
});

//Rota onde buscar a pergunta passando seu id nos parametros
app.get("/pergunta/:id", (req, res) => {
    var id = req.params.id;
    Pergunta.findOne({
        where: { id: id }
    }).then(pergunta => {
        if (pergunta != undefined) { //Pergunta encontrada
            res.render("pergunta", {
                pergunta: pergunta
            });
        } else {  //Pergunta nao encontrada
            res.redirect("/");
        }
    })
})

//Criando o server com express na porta 4000
app.listen(4000, () => {
    console.log("App online.")
});