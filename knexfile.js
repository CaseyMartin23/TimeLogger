const keys = require("./Keys/keys");

module.exports = {
  development: {
    client: "pg",
    connection: "postgres://postgres:1234@localhost:5432/timelogger_db",
    migrations: {
      directory: __dirname + "/db/migrations"
    },
    seeds: {
      directory: __dirname + "/db/seeds"
    }
  },
  production: {
    client: "pg",
    connection: "postgres://postgres:1234@localhost:5432/timelogger_db",
    migrations: {
      directory: __dirname + "/db/migrations"
    },
    seeds: {
      directory: __dirname + "/db/seeds/production"
    }
  }
};
