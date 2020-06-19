exports.up = function (knex, Promise) {
    return knex.schema.createTable('image_products', function (table) {
        table.increments().primary();

        table.integer('product_id').notNullable().unsigned();
        table.foreign('product_id').references('id').inTable('products')
        
        table.binary('image').notNullable();
        
        table.timestamp('created_at').notNullable().defaultTo(knex.raw('CURRENT_TIMESTAMP'))
        table.timestamp('updated_at').defaultTo(knex.raw('NULL ON UPDATE CURRENT_TIMESTAMP'))

    })
};

exports.down = function (knex, Promise) {
    return knex.schema.dropTable('image_products')
};