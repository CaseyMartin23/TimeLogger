exports.up = function(knex) {
  return knex.schema.createTable("user_tickets", table => {
    table.increments("ticket_id").notNullable();
    table
      .integer("user_id")
      .unsigned()
      .notNullable();
    table
      .foreign("user_id")
      .references("user_id")
      .inTable("users");
    table
      .integer("company_id")
      .unsigned()
      .notNullable();
    table
      .foreign("company_id")
      .references("company_id")
      .inTable("companies");
    table.string("description", [20000]);
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable("user_tickets");
};
