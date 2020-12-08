
exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('price_model').del()
    .then(function () {
      // Inserts seed entries
      return knex('price_model').insert([
        {
          id: 1, name: 'Super Value Option',
          is_active: true, is_default: false,
          description: 'Super value description',
          created_at: new Date(),
          updated_at: new Date()
        },
        {
          id: 2, name: 'Default',
          is_active: true, is_default: true,
          description: 'Default price list',
          created_at: new Date(),
          updated_at: new Date()
        },
        {
          id: 3, name: 'Long play',
          is_active: true, is_default: false,
          description: 'Long play options',
          created_at: new Date(),
          updated_at: new Date()
        },
      ]);
    });
};
