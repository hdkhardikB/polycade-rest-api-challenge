exports.up = (knex) => {
    return knex.schema.createTable('machine_price_model', table => {
        table.increments('id').primary()
        table.integer('price_model_id').references('price_model.id')
        table.integer('machine_id').references('machine.id')
        table.boolean('is_active').default(true)
        table.dateTime('created_at')
        table.dateTime('updated_at')
    })
};

exports.down = (knex) => {
    return knex.schema.dropTable('machine_price_model')
};
