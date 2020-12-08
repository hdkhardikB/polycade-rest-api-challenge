
exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('machine_price_model').del()
    .then(function () {
      // Inserts seed entries
      return knex('machine_price_model').insert([
        { id: 1, price_model_id: 1, machine_id: 1, is_active: true, created_at: new Date(), updated_at: new Date() },
        { id: 2, price_model_id: 3, machine_id: 3, is_active: true, created_at: new Date(), updated_at: new Date() },
        { id: 3, price_model_id: 2, machine_id: 4, is_active: true, created_at: new Date(), updated_at: new Date() },
      ]);
    });
};
