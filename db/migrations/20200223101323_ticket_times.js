exports.up = function(knex) {
  return knex.schema.createTable("ticket_times", table => {
    table.integer("ticket_id").notNullable();
    table
      .foreign("ticket_id")
      .references("ticket_id")
      .inTable("user_tickets");
    table.timestamp("start");
    table.timestamp("paused");
    table.integer("elapsed");
    table.timestamp("done");
    table.integer("total_time");
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable("ticket_times");
};
