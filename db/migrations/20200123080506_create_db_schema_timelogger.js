exports.up = function(knex) {
  return knex.schema.createTable("users", function(table) {
    table.string("LinkedinId").notNullable();
    table.string("Username").notNullable();
    table.string("Firstname").notNullable();
    table.string("Lastname").notNullable();
    table.string("UserRole").notNullable();
    table.timestamp("created_at").defaultTo(knex.fn.now());
    table.timestamp("updated_at").defaultTo(knex.fn.now());
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable("users");
};