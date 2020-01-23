const host = "localhost",
  username = "postgres",
  password = "admin",
  port = "5432",
  db = "timelogger_db";

module.exports = {
  development: {
    client: "pg",
    connection: `postgres://${username}:${password}@${host}:${port}/${db}`,
    migrations: {
      directory: __dirname + "/db/migrations"
    },
    seeds: {
      directory: __dirname + "/db/seeds"
    }
  },
  production: {
    client: "pg",
    connection: process.env.DATABASE_URL,
    migrations: {
      directory: __dirname + "/db/migrations"
    },
    seeds: {
      directory: __dirname + "/db/seeds/production"
    }
  }
};
