exports.up = function (knex, Promise) {
    return knex.schema.createTable('stores', function (table) {
        table.increments().primary();

        table.binary('logo').notNullable();
        table.string('fantasy_name').notNullable();
        table.string('legal_name').notNullable();
        table.string('state_registration').notNullable();

        table.string('cep').notNullable();
        table.string('logradouro').notNullable();
        table.string('number').notNullable();
        table.string('complement').notNullable();

        table.string('created_by').notNullable();
        table.foreign('created_by').references('cpf_cnpj').inTable('sellers')

        table.timestamp('created_at').notNullable().defaultTo(knex.raw('CURRENT_TIMESTAMP'))
        // table.timestamp('updated_at').defaultTo(knex.raw('NULL ON UPDATE CURRENT_TIMESTAMP'))
        table.timestamp('deleted_at')

    })
};

exports.down = function (knex, Promise) {
    return knex.schema.dropTable('stores')
};