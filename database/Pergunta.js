//Definindo um model importando o sequelize e a conexao com o banco de dados
const {DataTypes } = require("sequelize");
const connection = require("./database");

//Definindo a tabela e seus campos
const Pergunta = connection.define('perguntas', {
    titulo: {
        type: DataTypes.STRING,
        allowNull: false
    },
    descricao: {
        type: DataTypes.TEXT,
        allowNull: false
    }
});

//Passando o model para o banco de dados para que a tabela seja criada
Pergunta.sync({ force: false })

module.exports = Pergunta;