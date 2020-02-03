exports.up = function(knex) {
  return knex.schema.createTable("companies", table => {
    table.increments("company_id");
    table
      .integer("user_id")
      .unsigned()
      .notNullable();
    table
      .foreign("user_id")
      .references("user_id")
      .inTable("users");
    table.string("company_name", [100]).notNullable();
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable("companies");
};
