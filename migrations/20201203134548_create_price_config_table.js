exports.up = (knex) => {
    return knex.schema.createTable('price_config', table => {
        table.increments('id').primary()
        table.integer('price_model_id').references('price_model.id')
        table.string('name')
        table.boolean('is_active').default(true)
        table.integer('price')
        table.integer('time')
        table.dateTime('created_at')
        table.dateTime('updated_at')
    })
};

exports.down = (knex) => {
    return knex.schema.dropTable('price_config')
};
