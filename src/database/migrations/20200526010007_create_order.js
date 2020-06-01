exports.up = function (knex) {
    return knex.schema.createTable('orders', function (table) {
        table.increments().primary();

        table.string('client_id').notNullable();
        table.foreign('client_id').references('cpf').inTable('clients')

        table.string('seller_id').notNullable()
        table.foreign('seller_id').references('cpf_cnpj').inTable('sellers')

        table.string('city');
        table.string('uf');

        table.decimal('price');

        table.string('status');

        table.timestamp('created_at').notNullable().defaultTo(knex.raw('CURRENT_TIMESTAMP'))
        table.timestamp('updated_at').defaultTo(knex.raw('NULL ON UPDATE CURRENT_TIMESTAMP'))
    })
};

exports.down = function (knex) {
    return knex.schema.dropTable('orders')
};