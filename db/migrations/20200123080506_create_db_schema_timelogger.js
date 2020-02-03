exports.up = function(knex) {
<<<<<<< HEAD
  return knex.schema.createTable("users", function(table) {
    table.increments("user_id", [80]).notNullable();
    table.string("LinkedinId", [100]).notNullable();
    table.string("Username", [150]).notNullable();
    table.string("Firstname", [100]).notNullable();
    table.string("Lastname", [100]).notNullable();
    table.string("UserRole", [15]);
=======
  return knex.schema.createTable("users", table => {
    table.increments("user_id").primary();
    table.string("LinkedinId").notNullable();
    table.string("Username").notNullable();
    table.string("Firstname").notNullable();
    table.string("Lastname").notNullable();
    table.string("UserRole");
>>>>>>> 39fd694358f46a2a90784590a5e30306a2769232
    table.timestamp("created_at").defaultTo(knex.fn.now());
    table.timestamp("updated_at").defaultTo(knex.fn.now());
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable("users");
};
