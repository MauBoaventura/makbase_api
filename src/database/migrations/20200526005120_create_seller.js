exports.up = function (knex, Promise) {
    return knex.schema.createTable('sellers', function (table) {
        // table.increments().primary();
        knex.raw('`id` INT NULL AUTO_INCREMENT);');
        table.string('cpf_cnpj').notNullable().unique();
        table.binary('avatar');
        table.string('name').notNullable();
        table.string('lastname').notNullable();
        table.string('email').notNullable().primary();
        table.datetime('age').notNullable();
        table.string('password').notNullable();
        table.timestamp('created_at').notNullable().defaultTo(knex.raw('CURRENT_TIMESTAMP'))
        // table.timestamp('updatesd_at').defaultTo(knex.raw('NULL ON UPDATE CURRENT_TIMESTAMP'))
    })
};

exports.down = function (knex, Promise) {
    return knex.schema.dropTable('sellers')
};