exports.up = function(knex) {
  return knex.schema.createTable("users", function(table) {
    table.increments("user_id", [80]).notNullable();
    table.string("LinkedinId", [100]).notNullable();
    table.string("Username", [150]).notNullable();
    table.string("Firstname", [100]).notNullable();
    table.string("Lastname", [100]).notNullable();
    table.string("UserRole", [15]);
    table.timestamp("created_at").defaultTo(knex.fn.now());
    table.timestamp("updated_at").defaultTo(knex.fn.now());
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable("users");
};
