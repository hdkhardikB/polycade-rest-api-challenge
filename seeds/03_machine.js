
exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('machine').del()
    .then(function () {
      // Inserts seed entries
      return knex('machine').insert([
        { id: 1, name: 'Machine 1', description: 'Machine 1 description', is_active: true, created_at: new Date(), updated_at: new Date() },
        { id: 2, name: 'Machine 2', description: 'Machine 2 description', is_active: true, created_at: new Date(), updated_at: new Date() },
        { id: 3, name: 'Machine 3', description: 'Machine 3 description', is_active: true, created_at: new Date(), updated_at: new Date() },
        { id: 4, name: 'Machine 4', description: 'Machine 4 description', is_active: true, created_at: new Date(), updated_at: new Date() },
      ]);
    });
};
