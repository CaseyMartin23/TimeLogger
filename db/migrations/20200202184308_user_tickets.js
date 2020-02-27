exports.up = function(knex) {
  return knex.schema.createTable("user_tickets", table => {
    table.increments("ticket_id").notNullable();
    table
      .integer("user_id")
      .notNullable()
      .references("user_id")
      .inTable("users")
      .notNullable();
    table
      .integer("company_id")
      .notNullable()
      .references("company_id")
      .inTable("companies")
      .notNullable();
    table.integer("project_id").notNullable();
    table.string("subject_line");
    table.string("description", [20000]);
    table.string("ticket_state").defaultTo("Open");
    table.integer("ticket_time");
    table
      .timestamp("date_create")
      .defaultTo(knex.raw("NOW()"))
      .notNullable();
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable("user_tickets");
};
