const connection = require('../database/connection')
const util = require('../util/uteis')
const DAO_Seller = require('../database/DAO/DAOSeller')

module.exports = {
    async index(req, res) {

        const seller = await DAO_Seller.getAll()

        res.json(seller)
    },

    async get(req, res) {
        const cpf_cnpj = req.params.cpf_cnpj;

        const seller = await DAO_Seller.getOneByCpfCnpj(cpf_cnpj)
        if (seller == undefined)
            return res.status(401).json({
                error: "seller do not exist"
            })
        res.json(seller)
    },

    async post(req, res) {
        const cpf_cnpj = req.body.cpf_cnpj;
        const email = req.body.email;

        //Verifica se o cpf_cnpj já esta sendo utilizado
        if (await util.existe_Vendedor_cpf_cnpj(cpf_cnpj)) {
            return res.status(401).json({
                error: "CPF/CNPJ already used!"
            })
        }

        //Verifica se o email já esta sendo utilizado
        if (await util.existe_Vendedor_email(email)) {
            return res.status(401).json({
                error: "Email already used!"
            })
        }

        //Insere no banco
        try {
            req.body.password = await util.criptografar(req.body.password)
            await DAO_Seller.insert(req.body)
        } catch (error) {
            res.status(400).send({ error: error })
        }
        res.status(200).send()
    },

    async delete(req, res) {
        const vendedor_header = req.userId;
        const cpf_cnpj = req.params.cpf_cnpj;
        if (vendedor_header == cpf_cnpj) {
            //Verifica se o cpf_cnpj existe
            if (! await util.existe_Vendedor_cpf_cnpj(cpf_cnpj)) {
                return res.status(401).json({
                    error: "Seller do not exist!"
                })
            }
            await DAO_Seller.deleteOneByCPF(cpf_cnpj);

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

            const seller = await DAO_Seller.getOneByCpfCnpj(cpf_cnpj)

            //Verifica se o cpf_cnpj já esta sendo utilizado
            if (!await util.existe_Vendedor_cpf_cnpj(cpf_cnpj)) {
                return res.status(401).json({
                    error: "Vendedor do not exist!"
                })
            }

            if (req.body.cpf_cnpj != vendedor_header)
                //Verifica se o cpf_cnpj novo já esta sendo utilizado
                if (await util.existe_Vendedor_cpf_cnpj(req.body.cpf_cnpj)) {
                    return res.status(401).json({
                        error: "New CPF/CNPJ already used!"
                    })
                }

            if (seller.email != req.body.email) {
                //Verifica se o email novo já esta sendo utilizado
                if (await util.existe_Vendedor_email(req.body.email)) {
                    return res.status(401).json({
                        error: "New email already used!"
                    })
                }
            }
            req.body.password = await util.criptografar(req.body.password)
            await DAO_Seller.updateOneByCPF(cpf_cnpj, req.body)

            res.status(200).send()
        } else {
            return res.status(401).json({
                error: "Access Denied!"
            })
        }
    }
};