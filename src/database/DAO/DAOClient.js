const connection = require('../connection')
const moment = require('moment')

module.exports = {
    async getAll() {
        try {
            var client = await connection('clients')
                .select("*")
                .where({ "deleted_at": null })
        } catch (err) {
            return { error: err }
        }
        return client;

    },

    async getOneByCPF(cpf) {
        try {
            var client = await connection('clients')
                .select("*")
                .where({ "cpf": cpf, "deleted_at": null })
                .first()
        } catch (err) {
            return { error: err }
        }
        return client;
    },

    async getOneByEmail(email) {
        try {
            var client = await connection('clients')
                .select("*")
                .where({ "email": email, "deleted_at": null })
                .first()
        } catch (err) {
            return { error: err }
        }
        return client;
    },

    async deleteOneByCPF(cpf) {
        try {
            let data = moment().format();
            var client = await connection('clients')
                .update("deleted_at", moment().format("YYYY-MM-DD HH:mm:ss"))
                .where({ "cpf": cpf, "deleted_at": null })

        } catch (err) {
            return { error: err }
        }
    },

    async updateOneByCPF(cpf, atualiza) {
        try {
            var client = await connection('clients')
                .where({ "cpf": cpf, "deleted_at": null })
                .update(atualiza)

        } catch (err) {
            return { error: err }
        }
        return client;
    },

    async insert(dados) {
        try {
           await connection('clients').insert(dados)
        } catch (err) {
            return { error: err }
        }
    },




}