exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex("users")
    .del()
    .then(function() {
      // Inserts seed entries
      return knex("users").insert([
        {
          Id: "1",
          Username: "John",
          Password: "asougfh",
          Email: "john@gmail.com"
        },
        {
          Id: "2",
          Username: "Jennefer",
          Password: "akjsfn",
          Email: "jennefer@gmail.com"
        }
      ]);
    });
};
