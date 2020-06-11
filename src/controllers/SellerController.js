const crypto = require('crypto')
const moment = require('moment')
const connection = require('../database/connection')
const util = require('../util/uteis')

module.exports = {
    async index(req, res) {

        const dados = await connection('sellers')
            .select("*")

        res.json(dados)
    },

    async get(req, res) {
        const cpf_cnpj = req.params.cpf_cnpj;

        const dados = await connection('sellers')
            .select("*")
            .where("cpf_cnpj", cpf_cnpj)
            .first()

        if (dados == undefined)
            return res.status(401).json({
                error: "Sellers not exist"
            })
        res.json(dados)
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
        await connection('sellers').insert(req.body)


        res.status(200).send()
    },

    async delete(req, res) {
        const cpf_cnpj = req.params.cpf_cnpj;

        const seller = await connection('sellers')
            .select("*")
            .where("cpf_cnpj", cpf_cnpj)
            .first()

        if (seller == undefined)
            return res.status(401).json({
                error: "Sellers not exist"
            })

        await connection('sellers').where("cpf_cnpj", cpf_cnpj).delete()

        res.status(204).send()
    },

    async update(req, res) {
        const cpf_cnpj = req.params.cpf_cnpj;

        //Verifica se o cpf_cnpj já esta sendo utilizado
        if (!util.existe_Vendedor_cpf_cnpj(cpf_cnpj)) {
            return res.status(401).json({
                error: "Seller do not exist!"
            })
        }

        let seller = await connection('sellers')
            .where(cpf_cnpj)
            .update(req.body)

        res.json({
            seller
        })
    }
};