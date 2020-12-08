
exports.up = (knex) => {
    return knex.schema.createTable('machine', table => {
        table.increments('id').primary()
        table.string('name')
        table.boolean('is_active').default(true)
        table.string('description')
        table.dateTime('created_at')
        table.dateTime('updated_at')
    })
};

exports.down = (knex) => {
    return knex.schema.dropTable('machine')
};
