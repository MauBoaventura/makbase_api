exports.up = function (knex) {
    return knex.schema.createTable('orders', function (table) {
        table.increments().primary();

        table.integer('client_id').notNullable().unsigned();
        table.foreign('client_id').references('id').inTable('clients')

        table.integer('seller_id').notNullable().unsigned();
        table.foreign('seller_id').references('id').inTable('sellers')

        table.string('city');
        table.string('uf');

        table.decimal('price');

        table.string('status');

        table.timestamp('created_at').notNullable().defaultTo(knex.raw('CURRENT_TIMESTAMP'))
        // table.timestamp('updated_at').defaultTo(knex.raw('NULL ON UPDATE CURRENT_TIMESTAMP'))
        table.datetime('deleted_at');
    })
};

exports.down = function (knex) {
    return knex.schema.dropTable('orders')
};