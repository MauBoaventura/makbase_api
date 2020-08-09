const util = require('../util/uteis')
const DAOProduct = require('../database/DAO/DAOProduct');
const DAOSeller = require('../database/DAO/DAOSeller');
const DAOStore = require('../database/DAO/DAOStore');

module.exports = {
    async index(req, res) {

        const products = await DAOProduct.getAll()

        res.json(products)
    },

    async get(req, res) {
        const id = req.params.id;
        const product = await DAOProduct.getOneById(id)
        if (product == undefined)
            return res.status(401).json({
                error: "Product do not exist"
            })
        res.json(product)
    },

    async post(req, res) {

        try {
            const cpf_cnpj = req.userId
            const id = req.body.store_id

            var store = await DAOStore.getOneById(id)
            if (store == undefined) {
                return res.status(401).json({
                    error: "Loja não existe"
                })
            }

            var seller = await DAOSeller.getOneByCpfCnpj(cpf_cnpj)
            if (seller == undefined) {
                return res.status(401).json({
                    error: "Vendedor não existe"
                })
            }

            //Insere no banco
            await DAOProduct.insert(req.body)

            res.status(200).send()
        } catch (error) {
            return res.status(401).json({
                error: error
            })
        }

    },

    async update(req, res) {
        try {
            const cpf_cnpj = req.userId
            var id = req.params.id;

            var store = await DAOStore.getOneById(req.body.store_id)
            if (store == undefined) {
                return res.status(401).json({
                    error: "Loja não existe"
                })
            }

            var seller = await DAOSeller.getOneById(store.created_by)
            if (seller == undefined) {
                return res.status(401).json({
                    error: "Vendedor não existe"
                })
            }
            if (cpf_cnpj == seller.cpf_cnpj) {
                //Insere no banco
                await DAOProduct.updateOneById(id, req.body)
                res.status(200).send()
            } else {
                return res.status(401).json({
                    error: "Access Denied!"
                })
            }
        } catch (error) {
            return res.status(401).json({
                error: error
            })
        }
    },

    async delete(req, res) {
        try {
            var id = req.params.id;
            const cpf_cnpj = req.userId

            var product = await DAOProduct.getOneById(id);
            if (product == undefined) {
                return res.status(401).json({
                    error: "Produto não existe"
                })
            }

            var store = await DAOStore.getOneById(product.store_id)
            if (store == undefined) {
                return res.status(401).json({
                    error: "Loja não existe"
                })
            }

            var seller = await DAOSeller.getOneById(store.created_by)
            if (seller == undefined) {
                return res.status(401).json({
                    error: "Vendedor não existe"
                })
            }

            if (seller.cpf_cnpj == cpf_cnpj) {
                await DAOProduct.deleteOneById(id)
                res.status(200).send()
            }

        } catch (error) {
            return res.status(401).json({
                error: error
            })
        }
    },

};