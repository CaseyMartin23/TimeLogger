exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex("users")
    .del()
    .then(function() {
      // Inserts seed entries
      return knex("users").insert([
        {
          LinkedinId: "linkedin-123",
          Username: "John",
          Firstname: "oausfbh",
          Lastname: "daslifgh",
          UserRole: "Dancer",
          UserProfileImg: "ipzdcascvrfjbgnvnjsmv"
        },
        {
          LinkedinId: "linkedin-456",
          Username: "Jennefer",
          Firstname: "asdofuhfwqa",
          Lastname: "sdgkuh",
          UserRole: "Yeeter",
          UserProfileImg: "ipdrfjbgnvnjsmv"
        }
      ]);
    });
};
