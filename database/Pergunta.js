//Definindo um model importando o sequelize e a conexao com o banco de dados
const Sequelize = require("sequelize");
const connection = require("./database");

//Definindo a tabela e seus campos
const Pergunta = connection.define('perguntas', {
    titulo: {
        type: Sequelize.STRING,
        allowNull: false
    },
    decricao: {
        type: Sequelize.TEXT,
        allowNull: false
    }
});

//Passando o model para o banco de dados para que a tabela seja criada
Pergunta.sync({ force: false }).then(() => {
})

module.exports = Pergunta;