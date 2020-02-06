exports.up = function(knex) {
  return knex.schema.createTable("user_tickets", table => {
    table.increments("ticket_id");
    table.integer("user_id").unsigned();
    table
      .foreign("user_id")
      .references("user_id")
      .inTable("users");
    table.integer("company_id").unsigned();
    table
      .foreign("company_id")
      .references("company_id")
      .inTable("companies");
    table.string("subject_line");
    table.string("description", [20000]);
    table.string("ticket_time");
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable("user_tickets");
};
