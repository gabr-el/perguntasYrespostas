const sequelize = require("sequelize");
const connection = new sequelize('perguntasYrespostas', 'root', '032200', {
    host: 'localhost',
    dialect: 'mysql'
})

module.exports = connection;