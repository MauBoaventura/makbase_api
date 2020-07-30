const util = require('../util/uteis')
const authentication = require('../util/authentication')
const connection = require('../database/connection');

module.exports = {
    async loginCliente(req, res) {
        const email = req.body.email;
        const password = req.body.password;

        const client = await connection('clients')
            .select("*")
            .where("email", email)
            .first()

        if (client == undefined)
            return res.status(401).json({
                msg: "Cliente não cadastrado"
            })

        if (util.descriptografar(client.password) == password)
            return res.status(401).json({
                msg: "Senha incorreta"
            })

        delete client.password
        
        return res.status(200).json({
            token: authentication.gerarJWT({ cpf: client.cpf }),
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
                msg: "Vendedor não existe"
            })

        if (util.descriptografar(seller.password) == password)
            return res.status(401).json({
                msg: "Senha incorreta"
            })

        delete seller.password

        return res.status(200).json({
            token: authentication.gerarJWT({ cpf_cnpj: seller.cpf_cnpj }),
            user: seller,
        })
    },
}