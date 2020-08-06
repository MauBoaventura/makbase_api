exports.up = function (knex, Promise) {
    return knex.schema.createTable('carts', function (table) {
        table.increments().primary();

        table.integer('id_cart').notNullable();
        
        table.integer('product_id').notNullable().unsigned();
        table.foreign('product_id').references('id').inTable('products')
        
        table.integer('quant');
        table.decimal('price');        
        
        table.timestamp('created_at').notNullable().defaultTo(knex.raw('CURRENT_TIMESTAMP'))
        // table.timestamp('updated_at').defaultTo(knex.raw('NULL ON UPDATE CURRENT_TIMESTAMP'))
        table.datetime('deleted_at');
    })
};

exports.down = function (knex, Promise) {
    return knex.schema.dropTable('carts')
};