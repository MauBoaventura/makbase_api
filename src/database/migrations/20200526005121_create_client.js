exports.up = function (knex, Promise) {
    return knex.schema.createTable('clients', function (table) {
        table.increments();
        knex.raw('`id` INT NULL AUTO_INCREMENT);');
        table.string('cpf').notNullable().unique();
        table.binary('avatar').notNullable();
        table.string('name').notNullable();
        table.string('lastname').notNullable();
        table.string('email').notNullable().unique();
        table.datetime('age').notNullable();
        table.string('password').notNullable();
        table.timestamp('created_at').notNullable().defaultTo(knex.raw('CURRENT_TIMESTAMP'));
        // table.timestamp('updated_at').defaultTo(knex.raw('NULL ON UPDATE CURRENT_TIMESTAMP'))
        table.datetime('deleted_at');

    })
};

exports.down = function (knex, Promise) {
    return knex.schema.dropTable('clients')
};