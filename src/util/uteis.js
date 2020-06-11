module.exports = {
    async existe_cpf_cnpj(cpf_cnpj) {
        const sellers = await connection('sellers')
            .select("*")
            .where("cpf_cnpj", cpf_cnpj)
            .frist()

        const clients = await connection('clients')
            .select("*")
            .where("cpf_cnpj", cpf_cnpj)
            .frist()

        //Se não existir cpf cadastrados retorna false
        if (sellers == undefined || clients == undefined)
            return false

        return true;
    },

    async existe_Vendedor_cpf_cnpj(cpf_cnpj) {
        const sellers = await connection('sellers')
            .select("*")
            .where("cpf_cnpj", cpf_cnpj)
            .frist()
        if (sellers == undefined)
            return false

        return true;

    },
    
    async existe_Cliente_cpf_cnpj(cpf_cnpj) {
        const clients = await connection('clients')
            .select("*")
            .where("cpf_cnpj", cpf_cnpj)
            .frist()
        if (clients == undefined)
            return false

        return true;

    }
}