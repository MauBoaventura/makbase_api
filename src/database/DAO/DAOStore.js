const connection = require('../connection')
const moment = require('moment')

module.exports = {
    async getAll() {
        try {
            var store = await connection('stores')
                .select("*")
                .where({ "deleted_at": null })
        } catch (err) {
            return { error: err }
        }
        return store;

    },

    async getOneById(id) {
        try {
            var store = await connection('stores')
                .select("*")
                .where({ "id": id, "deleted_at": null })
                .first()
        } catch (err) {
            return { error: err }
        }
        return store;
    },

    // async getOneByEmail(email) {
    //     try {
    //         var store = await connection('stores')
    //             .select("*")
    //             .where({ "email": email, "deleted_at": null })
    //             .first()
    //     } catch (err) {
    //         return { error: err }
    //     }
    //     return store;
    // },
    async insert(dados) {
        try {
           await connection('stores').insert(dados)
        } catch (err) {
            throw { error: err }
        }
    },

    async updateOneById(id, atualiza) {
        try {
            await connection('stores')
                .where({ "id": id, "deleted_at": null })
                .update(atualiza)

        } catch (err) {
            throw { error: err }
        }
    },

    async deleteOneById(id) {
        try {
            await connection('stores')
                .update("deleted_at", moment().format("YYYY-MM-DD HH:mm:ss"))
                .where({ "id": id, "deleted_at": null })

        } catch (err) {
            throw { error: err }
        }
    },


}