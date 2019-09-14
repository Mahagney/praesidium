
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('users').del()
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([
        {first_name: 'Robert', last_name: 'Mihai', email: 'ronaldo@gmail.com', password: 'password'},
          {first_name: 'Ovidiul', last_name: 'Lupul', email: 'chel@gmail.com', password: 'password'},
          {first_name: 'Saleh', last_name: 'Mahagney', email: 'yoga@gmail.com', password: 'password'}


      ]);
    });
};
