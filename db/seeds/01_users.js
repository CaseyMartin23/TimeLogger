exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex("users")
    .del()
    .then(function() {
      // Inserts seed entries
      return knex("users").insert([
        { id: 1, name: "John", email: "john@gmail.com" },
        { id: 2, name: "Gerald", email: "gerald@gmail.com" },
        { id: 3, name: "Jennefer", email: "jennefer@gmail.com" }
      ]);
    });
};
