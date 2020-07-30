//Configurando as variaveis de ambiente
require('dotenv').config()

const express = require('express')
const routes = require('./routes')

const app = express()

//Configurar cookies
const cookieSession = require('cookie-session')
app.use(cookieSession({
    name:"testando",
    keys:['key1','key2']
}))

//Configuração de autenticacao pelo Google
const passport = require('passport')
require('./util/passaport-google')
app.use(passport.initialize());
app.use(passport.session());

app.use(express.json())
app.use(routes)

var port = normalizePort(process.env.PORT || '3031');

//Poe o servidor para rodar ma porta especificada
app.listen(port, function () {
    console.log("Servidor online rodando na porta: " + port);
});

function normalizePort(val) {
    var port = parseInt(val, 10);

    if (isNaN(port)) {
        // named pipe
        return val;
    }

    if (port >= 0) {
        // port number
        return port;
    }
    return false;
}