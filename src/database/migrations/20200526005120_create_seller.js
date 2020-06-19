exports.up = function (knex, Promise) {
    return knex.schema.createTable('sellers', function (table) {
        // table.increments().primary();
        table.string('cpf_cnpj').notNullable().primary();
        table.binary('avatar');
        table.string('name').notNullable();
        table.string('lastname').notNullable();
        table.string('email').notNullable();
        table.datetime('age').notNullable();
        table.string('password').notNullable();
        table.timestamp('created_at').notNullable().defaultTo(knex.raw('CURRENT_TIMESTAMP'))
        table.timestamp('updated_at').defaultTo(knex.raw('NULL ON UPDATE CURRENT_TIMESTAMP'))


    })
};

exports.down = function (knex, Promise) {
    return knex.schema.dropTable('sellers')
};