exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex("user_tickets")
    .del()
    .then(function() {
      // Inserts seed entries
      return knex("user_tickets").insert([
        {
          user_id: 1,
          company_id: 1,
          subject_line: "this is a ticket sub-line",
          description: "I was bored !!"
        },
        {
          user_id: 2,
          company_id: 2,
          description: "I was bored !!"
        }
      ]);
    });
};
