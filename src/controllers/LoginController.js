var GoogleStrategy = require('passport-google-oauth20').Strategy;
const passport = require('passport')
const util = require('../util/uteis')
const authentication = require('../util/authentication')

module.exports = {
    async loginCliente(req, res) {
        const email = req.body.email;
        const password = req.body.password;

        // const client = await connection('clients')
        //     .select("*")
        //     .where("email", email)
        //     .first()

        // if (client == undefined)
        //     return res.status(401).json({
        //         msg: "Client do not exist"
        //     })

        // if (util.descriptografar(client.password) == password)
        //     return res.status(401).json({
        //         msg: "Senha incorreta"
        //     })

        return res.status(200).json({
            token: authentication.gerarJWT({ id: "teste" }),
            // nome:client.name
        })
    },


    async loginVendedor(req, res) {
        req.session = null
        req.logout()
        res.redirect('/good')
    },



}