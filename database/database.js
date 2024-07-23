const { Sequelize } = require("sequelize");
const connection = new Sequelize('perguntasYrespostas', 'root', '032200', {
    host: 'localhost',
    dialect: 'mysql'
})

module.exports = connection;