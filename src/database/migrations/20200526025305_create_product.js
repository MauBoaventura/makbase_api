exports.up = function (knex, Promise) {
    return knex.schema.createTable('products', function (table) {
        table.increments().primary();

        table.integer('store_id').notNullable().unsigned();
        table.foreign('store_id').references('id').inTable('stores')

        table.string('status').notNullable();

        table.string('name').notNullable();

        table.string('sku').notNullable();

        table.decimal('unit_price');
        table.decimal('unit_price_discount');

        table.string('description').notNullable();
        table.integer('stock').defaultTo(0);

        table.string('seo_description').notNullable();
        table.string('seo_name').notNullable();

        table.integer('category_id').notNullable().unsigned();
        table.foreign('category_id').references('id').inTable('product_categories')

        table.integer('collor_id').notNullable().unsigned();
        table.foreign('collor_id').references('id').inTable('product_collors')

        table.integer('size_id').notNullable().unsigned();
        table.foreign('size_id').references('id').inTable('product_sizes')

        table.timestamp('created_at').notNullable().defaultTo(knex.raw('CURRENT_TIMESTAMP'))
        table.timestamp('updated_at').defaultTo(knex.raw('NULL ON UPDATE CURRENT_TIMESTAMP'))

    })
};

exports.down = function (knex, Promise) {
    return knex.schema.dropTable('products')
};