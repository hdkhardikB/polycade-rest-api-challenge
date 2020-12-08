
exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('price_config').del()
    .then(function () {
      // Inserts seed entries
      return knex('price_config').insert([
        {
          id: 1,
          price: 15,
          price_model_id: 3,
          is_active: true,
          name: "60 minutes",
          time: 60,
          created_at: new Date(),
          updated_at: new Date()
        }, {
          id: 2,
          price: 3,
          price_model_id: 2,
          is_active: true,
          name: "10 minutes",
          time: 10,
          created_at: new Date(),
          updated_at: new Date()
        }, {
          id: 3,
          price: 5,
          price_model_id: 2,
          is_active: true,
          name: "20 minutes",
          time: 20,
          created_at: new Date(),
          updated_at: new Date()
        }, {
          id: 4,
          price: 15,
          price_model_id: 2,
          is_active: true,
          name: "60 minutes",
          time: 60,
          created_at: new Date(),
          updated_at: new Date()
        }, {
          id: 5,
          price: 3,
          price_model_id: 1,
          is_active: true,
          name: "10 minutes",
          time: 10,
          created_at: new Date(),
          updated_at: new Date()
        }, {
          id: 6,
          price: 5,
          price_model_id: 1,
          is_active: true,
          name: "20 minutes",
          time: 20,
          created_at: new Date(),
          updated_at: new Date()
        }
      ]);
    });
};
