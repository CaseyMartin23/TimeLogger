exports.up = function(knex) {
  return knex.schema.createTable("users", table => {
    table.increments("user_id");
    table.string("LinkedinId").notNullable();
    table.string("Username").notNullable();
    table.string("Firstname").notNullable();
    table.string("Lastname").notNullable();
    table.string("UserRole");
    table.string("UserProfileImg").notNullable();
    table.timestamp("created_at").defaultTo(knex.fn.now());
    table.timestamp("updated_at").defaultTo(knex.fn.now());
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable("users");
};
