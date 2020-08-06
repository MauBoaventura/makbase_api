const crypto = require('crypto')
const moment = require('moment')
const connection = require('../database/connection')
const util = require('../util/uteis')

module.exports = {
    async index(req, res) {

        const client = await connection('products')
            .select("*")

        res.json(client)
    },

    async get(req, res) {
        const id = req.params.id;
        const product = await connection('products')
            .select("*")
            .where("id", id)
            .first()
        if (product == undefined)
            return res.status(401).json({
                error: "Product do not exist"
            })
        res.json(product)
    },

    async post(req, res) {
        const store_id = req.userId

        req.body = { store_id: store_id }

        //Insere no banco
        await connection('products').insert(req.body)

        res.status(200).send()
    },

    async delete(req, res) {
        const id = req.params.id;
        const store_id = req.userId

        const product = await connection('products')
            .select("*")
            .where("id", id)
            .first()

        //Verificar autorização
        if (product.store_id == store_id) {
            await connection('products')
                .where("id", id)
                .update("deleted_at", Date.now)

            res.status(204).send()
        } else {
            return res.status(401).json({
                error: "Access Denied"
            })
        }
    },

    async update(req, res) {
        const id = req.params.id;
        const store_id = req.userId

        const product = await connection('products')
            .select("*")
            .where("id", id)
            .first()

        //Verificar autorização
        if (product.store_id == store_id) {
            let client = await connection('products')
                .where("id", id)
                .update(req.body)

            res.status(200).send();
        }
    }
};