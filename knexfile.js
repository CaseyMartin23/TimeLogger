module.exports = {
  development: {
    client: "pg",
<<<<<<< HEAD
    connection: {
      host: "localhost",
      user: "postgres",
      password: "",
      database: "timelogger_db"
    },
=======
    connection: "postgres://postgres:1234@localhost:5432/timelogger_db",
>>>>>>> 39fd694358f46a2a90784590a5e30306a2769232
    migrations: {
      directory: __dirname + "/db/migrations"
    },
    seeds: {
      directory: __dirname + "/db/seeds"
    }
  },
  production: {
    client: "pg",
<<<<<<< HEAD
    connection: {
      host: "localhost",
      user: "postgres",
      password: "",
      database: "timelogger_db"
    },
=======
    connection: "postgres://postgres:1234@localhost:5432/timelogger_db",
>>>>>>> 39fd694358f46a2a90784590a5e30306a2769232
    migrations: {
      directory: __dirname + "/db/migrations"
    },
    seeds: {
      directory: __dirname + "/db/seeds/production"
    }
  }
};
