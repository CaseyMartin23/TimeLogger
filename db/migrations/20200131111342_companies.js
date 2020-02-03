exports.up = function(knex) {
  return knex.schema.createTable("companies", table => {
    table
      .integer("user_id")
      .unsigned()
      .notNullable();
    table
      .foreign("user_id")
      .references("user_id")
      .inTable("users");
    table.increments("id");
    table.string("company_name");
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable("companies");
};
