const express = require("express");
const app = express();

//Estou dizendo ao express para usar o ejs como view engine
app.set('view engine', 'ejs')

//Utilizando o método render do ejs
app.get("/", (req, res) => {
    res.render("principal/perfil");
})

app.listen(4000, () => {
    console.log("App logando!")
})