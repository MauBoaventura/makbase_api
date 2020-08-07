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
        dados.password = util.descriptografar(dados.password)
        res.json(dados)
    },

    async post(req, res) {
        const cpf_cnpj = req.body.cpf_cnpj;
        const email = req.body.email;

        //Verifica se o cpf_cnpj já esta sendo utilizado
        if (await util.existe_Vendedor_cpf_cnpj(cpf_cnpj)) {
            return res.status(401).json({
                error: "Cpf already used!"
            })
        }

        if (await util.existe_Vendedor_email(email)) {
            return res.status(401).json({
                error: "Cpf already used!"
            })
        }

        try {
            //Criptografar senha
            req.body.password = await util.criptografar(req.body.password)
            //Insere no banco
            await connection('sellers').insert(req.body)

        } catch (error) {
            return res.status(401).json({
                error: error
            })
        }


        res.status(200).send()
    },

    async delete(req, res) {
        const cliente_header = req.userId;
        const cpf_cnpj = req.params.cpf_cnpj;

        if (cliente_header == cpf_cnpj) {

            if (!util.existe_Vendedor_cpf_cnpj(cpf_cnpj)) {
                return res.status(401).json({
                    error: "Seller do not exist!"
                })
            }

            await connection('sellers')
                .where("cpf_cnpj", cpf_cnpj)
                .update("deleted_at", Date.now)

            res.status(204).send()
        } else {
            return res.status(401).json({
                error: "Access Denied!"
            })
        }
    },

    async update(req, res) {
        const vendedor_header = req.userId;
        const cpf_cnpj = req.params.cpf_cnpj;

        if (vendedor_header == cpf_cnpj) {

            const client = await connection('clients')
                .select("*")
                .where("cpf_cnpj", cpf_cnpj)
                .first()

            //Verifica se o cpf_cnpj já esta sendo utilizado
            if (!util.existe_Vendedor_cpf_cnpj(cpf_cnpj)) {
                return res.status(401).json({
                    error: "Vendedor do not exist!"
                })
            }

            if (req.body.cpf_cnpj != vendedor_header)
                //Verifica se o cpf_cnpj novo já esta sendo utilizado
                if (util.existe_Vendedor_cpf_cnpj(req.body.cpf_cnpj)) {
                    return res.status(401).json({
                        error: "New CPF already used!"
                    })
                }

            if (client.email != req.body.email) {
                //Verifica se o email novo já esta sendo utilizado
                if (util.existe_Vendedor_email(req.body.email)) {
                    return res.status(401).json({
                        error: "New email already used!"
                    })
                }
            }
            await connection('sellers')
                .where({ cpf_cnpj: cpf_cnpj })
                .update(req.body)

            res.status(200).send()
        } else {
            return res.status(401).json({
                error: "Access Denied!"
            })
        }




        //Verifica se o cpf_cnpj já esta sendo utilizado
        if (!util.existe_Vendedor_cpf_cnpj(cpf_cnpj)) {
            return res.status(401).json({
                error: "Seller do not exist!"
            })
        }
        console.log(cpf_cnpj)

        //Verifica se o cpf_cnpj novo já esta sendo utilizado
        if (util.existe_Vendedor_cpf_cnpj(req.body.cpf_cnpj)) {
            return res.status(401).json({
                error: "New CPF already used!"
            })
        }

        //Verifica se o email novo já esta sendo utilizado
        if (util.existe_Vendedor_email(req.body.email)) {
            return res.status(401).json({
                error: "New email already used!"
            })
        }

        let seller = await connection('sellers')
            .where("cpf_cnpj", cpf_cnpj)
            .update(req.body)

        res.status(200).send();
    }
};