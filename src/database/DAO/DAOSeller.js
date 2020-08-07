const connection = require('../connection')
const moment = require('moment')

module.exports = {
    async getAll() {
        try {
            var seller = await connection('sellers')
                .select("*")
                .where({ "deleted_at": null })
        } catch (err) {
            return { error: err }
        }
        return seller;

    },

    async getOneByCpfCnpj(cpf_cnpj) {
        try {
            var seller = await connection('sellers')
                .select("*")
                .where({ "cpf_cnpj": cpf_cnpj, "deleted_at": null })
                .first()
        } catch (err) {
            return { error: err }
        }
        return seller;
    },

    async getOneByEmail(email) {
        try {
            var seller = await connection('sellers')
                .select("*")
                .where({ "email": email, "deleted_at": null })
                .first()
        } catch (err) {
            return { error: err }
        }
        return seller;
    },

    async deleteOneByCPF(cpf_cnpj) {
        try {
            let data = moment().format();
            console.log(data)
            await connection('sellers')
                .update("deleted_at", moment().format("YYYY-MM-DD HH:mm:ss"))
                .where({ "cpf_cnpj": cpf_cnpj, "deleted_at": null })

        } catch (err) {
            throw { error: err }
        }
    },

    async updateOneByCPF(cpf_cnpj, atualiza) {
        try {
            await connection('sellers')
                .where({ "cpf_cnpj": cpf_cnpj, "deleted_at": null })
                .update(atualiza)

        } catch (err) {
            throw { error: err }
        }
    },

    async insert(dados) {
        try {
           await connection('sellers').insert(dados)
        } catch (err) {
            throw { error: err }
        }
    },


}