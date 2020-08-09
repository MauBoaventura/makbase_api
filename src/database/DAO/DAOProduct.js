const connection = require('../connection')
const moment = require('moment')

module.exports = {
    async getAll() {
        try {
            var client = await connection('products')
                .select("*")
                .where({ "deleted_at": null })
        } catch (err) {
            return { error: err }
        }
        return client;

    },

    async getOneById(id) {
        try {
            var client = await connection('products')
                .select("*")
                .where({ "id": id, "deleted_at": null })
                .first()
        } catch (err) {
            throw err;
        }
        return client;
    },

    async insert(dados) {
        try {
            let produto = await connection('products').insert(dados)
        } catch (err) {
            throw err;
        }
    },

    async updateOneById(id, atualiza) {
        try {
            var client = await connection('products')
                .where({ "id": id, "deleted_at": null })
                .update(atualiza)

        } catch (err) {
            throw err;
        }
        return client;
    },

    async deleteOneById(id) {
        try {
            let data = moment().format();
            var client = await connection('products')
                .update("deleted_at", moment().format("YYYY-MM-DD HH:mm:ss"))
                .where({ "id": id, "deleted_at": null })

        } catch (err) {
            throw err;
        }
    },
}