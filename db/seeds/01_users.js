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
          Firstname: "oausfbh",
          Lastname: "daslifgh",
          Email: "john@gmail.com"
        },
        {
          Id: "2",
          Username: "Jennefer",
          Password: "akjsfn",
          Firstname: "asdofuhfwqa",
          Lastname: "sdgkuh",
          Email: "jennefer@gmail.com"
        }
      ]);
    });
};
