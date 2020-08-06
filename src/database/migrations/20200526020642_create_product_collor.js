exports.up = function (knex) {
    return knex.schema.createTable('product_collors', function (table) {
        table.increments().primary();

        table.string('collor');

        table.timestamp('created_at').notNullable().defaultTo(knex.raw('CURRENT_TIMESTAMP'))
        // table.timestamp('updated_at').defaultTo(knex.raw('NULL ON UPDATE CURRENT_TIMESTAMP'))
        table.datetime('deleted_at');
    })
};

exports.down = function (knex) {
    return knex.schema.dropTable('product_collors')
};