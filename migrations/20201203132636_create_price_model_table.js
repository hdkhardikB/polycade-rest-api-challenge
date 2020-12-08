
exports.up = function (knex) {

};

exports.down = function (knex) {

};

exports.up = (knex) => {
    return knex.schema.createTable('price_model', table => {
        table.increments('id').primary()
        table.string('name')
        table.boolean('is_active').default(true)
        table.boolean('is_default').default(false)
        table.string('description')
        table.dateTime('created_at')
        table.dateTime('updated_at')
    })
};

exports.down = (knex) => {
    return knex.schema.dropTable('price_model')
};
