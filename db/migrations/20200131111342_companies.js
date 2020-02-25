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
    table.string("company_name", [100]);
    table
      .timestamp("date_create", { useTz: false })
      .defaultTo(knex.fn.now())
      .notNullable();
  });
};

exports.down = knex => {
  return knex.schema.dropTable("companies");
};
