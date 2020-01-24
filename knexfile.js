const keys = require("./server/Keys/keys");

module.exports = {
  development: {
    client: "pg",
    connection: keys.postgresDB.db_URI,
    migrations: {
      directory: __dirname + "/db/migrations"
    },
    seeds: {
      directory: __dirname + "/db/seeds"
    }
  },
  production: {
    client: "pg",
    connection: keys.postgresDB.db_URI,
    migrations: {
      directory: __dirname + "/db/migrations"
    },
    seeds: {
      directory: __dirname + "/db/seeds/production"
    }
  }
};
