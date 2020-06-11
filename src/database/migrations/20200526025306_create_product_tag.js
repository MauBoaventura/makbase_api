exports.up = function (knex) {
    return knex.schema.createTable('product_tags', function (table) {
        table.increments().primary();

        table.integer('product_id').notNullable().unsigned();
        table.foreign('product_id').references('id').inTable('products')
        
        table.string('tag_name').notNullable();

        table.timestamp('created_at').notNullable().defaultTo(knex.raw('CURRENT_TIMESTAMP'))
        table.timestamp('updated_at').defaultTo(knex.raw('NULL ON UPDATE CURRENT_TIMESTAMP'))
    })
};

exports.down = function (knex) {
    return knex.schema.dropTable('product_tags')
};