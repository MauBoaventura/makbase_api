const util = require('../util/uteis')
const authentication = require('../util/authentication')
const connection = require('../database/connection');
const DAOClient = require ('../database/DAO/DAOClient')
module.exports = {
    async loginCliente(req, res) {
        const email = req.body.email;
        const password = req.body.password;

        const client = await DAOClient.getOneByEmail(email)

        if (client == undefined)
            return res.status(401).json({
                error: "Cliente não cadastrado"
            })

        if (util.descriptografar(client.password) != password)
            return res.status(401).json({
                error: "Senha incorreta"
            })

        delete client.password

        return res.status(200).json({
            token: authentication.gerarJWT({ id: client.cpf }),
        })
    },

    async loginVendedor(req, res) {
        const email = req.body.email;
        const password = req.body.password;

        const seller = await connection('sellers')
            .select("*")
            .where("email", email)
            .first()

        if (seller == undefined)
            return res.status(401).json({
                error: "Vendedor não existe"
            })

        if (util.descriptografar(seller.password) == password)
            return res.status(401).json({
                error: "Senha incorreta"
            })

        delete seller.password

        return res.status(200).json({
            token: authentication.gerarJWT({ id: seller.cpf_cnpj }),
            user: seller,
        })
    },

    async logout(req, res) {

    }
}