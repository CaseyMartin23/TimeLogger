exports.up = function(knex) {
  return knex.schema.createTable("projects", table => {
    table.increments("project_id").notNullable();
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
    table.string("project_name").notNullable();
    table
      .timestamp("date_create", { useTz: false })
      .defaultTo(knex.fn.now())
      .notNullable();
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable("projects");
};
