exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex("todos")
    .del()
    .then(function() {
      // Inserts seed entries
      return knex("todos").insert([
        { id: 1, title: "go work", user_id: 1 },
        { id: 2, title: "go hunt", user_id: 2 },
        { id: 3, title: "go sleep", user_id: 3 }
      ]);
    });
};
