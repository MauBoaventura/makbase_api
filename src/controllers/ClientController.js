const crypto = require('crypto')
const moment = require('moment')
const connection = require('../database/connection')
const util = require('../util/uteis')

module.exports = {
    async index(req, res) {

        const client = await connection('clients')
            .select("*")

        res.json(client)
    },

    async get(req, res) {
        const cpf_cnpj = req.params.cpf_cnpj;

        const client = await connection('clients')
            .select("*")
            .where("cpf_cnpj", cpf_cnpj)
            .first()

        if (client == undefined)
            return res.status(401).json({
                error: "Client do not exist"
            })
        res.json(client)
    },

    async post(req, res) {
        const cpf_cnpj = req.body.cpf_cnpj;

        //Verifica se o cpf_cnpj já esta sendo utilizado
        if (util.existe_cpf_cnpj(cpf_cnpj)) {
            return res.status(401).json({
                error: "Cpf already used!"
            })
        }

        //Insere no banco
        await connection('clients').insert(req.body)


        res.status(200).send()
    },

    async delete(req, res) {
        const cpf_cnpj = req.params.cpf_cnpj;

        //Verifica se o cpf_cnpj já esta sendo utilizado
        if (!util.existe_Cliente_cpf_cnpj(cpf_cnpj)) {
            return res.status(401).json({
                error: "Client do not exist!"
            })
        }

        await connection('clients').where("cpf_cnpj", cpf_cnpj).delete()

        res.status(204).send()
    },

    async update(req, res) {
        const cpf = req.params.cpf_cnpj;

        //Verifica se o cpf_cnpj já esta sendo utilizado
        if (!util.existe_Cliente_cpf_cnpj(cpf)) {
            return res.status(401).json({
                error: "Client do not exist!"
            })
        }
        
        //Verifica se o cpf_cnpj novo já esta sendo utilizado
        if (util.existe_Cliente_cpf_cnpj(req.body.cpf_cnpj)) {
            return res.status(401).json({
                error: "New CPF already used!"
            })
        }

        //Verifica se o email novo já esta sendo utilizado
        if (util.existe_Cliente_email(req.body.email)) {
            return res.status(401).json({
                error: "New email already used!"
            })
        }      

        let client = await connection('clients')
            .where({cpf:cpf})
            .update(req.body)

        res.status(200).send()
    }
};