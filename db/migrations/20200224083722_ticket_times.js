exports.up = function(knex) {
  return knex.schema.createTable("ticket_times", table => {
    table.integer("ticket_id").notNullable();
    table.string("ticket_state");
    table.timestamp("start_time", { useTz: false });
    table.timestamp("pause_time", { useTz: false });
    table.timestamp("completed_time", { useTz: false });
    table.integer("elapsed_time");
    table.integer("total_time").defaultTo(0);
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable("ticket_times");
};
