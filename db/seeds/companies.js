exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex("companies")
    .del()
    .then(function() {
      // Inserts seed entries
      return knex("companies").insert([
        {
          user_id: 1,
          company_name: "The Yeetable"
        },
        {
          user_id: 2,
<<<<<<< HEAD
          company_name: "The Yeetable 2"
=======
          company_name: "The Return of The Yeetable"
>>>>>>> 39fd694358f46a2a90784590a5e30306a2769232
        }
      ]);
    });
};