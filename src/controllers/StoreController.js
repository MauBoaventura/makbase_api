const connection = require('../database/connection')
const util = require('../util/uteis')
const DAOSeller = require('../database/DAO/DAOSeller');
const DAOStore = require('../database/DAO/DAOStore');

module.exports = {
    async index(req, res) {

        const store = await DAOStore.getAll()

        res.json(store)
    },

    async get(req, res) {
        const id = req.params.id;

        const store = await DAOStore.getOneById(id)
        if (store == undefined)
            return res.status(401).json({
                error: "Store do not exist"
            })
        res.json(store)
    },

    async post(req, res) {
        const vendedor_header = req.userId;
        //Verificações???

        //Insere no banco
        try {
            let vendedor = await DAOSeller.getOneByCpfCnpj(vendedor_header);
            req.body.created_by = vendedor.id
            await DAOStore.insert(req.body)
        } catch (error) {
            res.status(400).send({ error: error })
        }
        res.status(200).send()
    },

    async delete(req, res) {
        try {

            const vendedor_header = req.userId;

            const id = req.params.id;

            var store = await DAOStore.getOneById(id)
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
            if (vendedor_header == seller.cpf_cnpj) {

                await DAOStore.deleteOneById(id);

                //Deletar em cascata os produtos

                return res.status(204).send()

            } else {
                return res.status(401).json({
                    error: "Access Denied!"
                })
            }
        } catch (error) {
            res.status(400).send({ error: error })

        }
    },

    async update(req, res) {
        const vendedor_header = req.userId;

        const id = req.params.id;
        var store = await DAOStore.getOneById(id)
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
        if (vendedor_header == seller.cpf_cnpj) {

            await DAOStore.updateOneById(id, req.body)

            res.status(200).send()
        } else {
            return res.status(401).json({
                error: "Access Denied!"
            })
        }
    }
};