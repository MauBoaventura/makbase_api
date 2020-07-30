const moment = require('moment')

const connection = require('../database/connection')
const crypto = require('crypto')
// const encrypted_Key = "CenH@$uPeRF0RTeCenH@$uPeRF0RTe87"
   const encrypted_Key = process.env.SECRET_PASSWORD
   
module.exports = {
    async existe_cpf_cnpj(cpf_cnpj) {
        const sellers = await connection('sellers')
            .select("*")
            .where("cpf_cnpj", cpf_cnpj)
            .first()

        const clients = await connection('clients')
            .select("*")
            .where("cpf", cpf_cnpj)
            .first()

        //Se não existir cpf cadastrados retorna false
        if (sellers == undefined && clients == undefined)
            return false

        return true;
    },

    async existe_Vendedor_cpf_cnpj(cpf_cnpj) {
        const sellers = await connection('sellers')
            .select("*")
            .where("cpf_cnpj", cpf_cnpj)
            .first()
        if (sellers == undefined)
            return false

        return true;

    },

    async existe_Cliente_cpf_cnpj(cpf_cnpj) {
        const clients = await connection('clients')
            .select("*")
            .where("cpf", cpf_cnpj)
            .first()
        if (clients == undefined)
            return false

        return true;

    },

    async criptografar(senha) {
        try {
            const cipher = crypto.createCipheriv("aes-192-ecb", Buffer.from(encrypted_Key, "base64"), null);
            const encryptedSecret = cipher.update(senha, "utf8", "base64") + cipher.final("base64");
            return encryptedSecret;
        } catch (error) {
            return error
        }
    },

    async descriptografar(senha) {
        const decipher = crypto.createDecipheriv("aes-192-ecb", Buffer.from(encrypted_Key, "base64"), null);
        const decryptedSecret = decipher.update(senha, "base64", "utf8") + decipher.final("utf8");
        return decryptedSecret;
    }
}

