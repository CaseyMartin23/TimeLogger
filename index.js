var express = require("express");
// var PORT = require("./src/config/constants");
var bodyParser = require("body-parser");
var knex = require("./db/knex");

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get("/", (req, res) => res.send("Hello World!"));

app.get("/todos", (req, res) => {
  console.log("hello");
  knex
    .select()
    .from("todos")
    .then(todos => {
      res.send(todos);
    });
});

app.listen(process.env.PORT || 3005, () => {
  console.log(`Server is listening on port 3005`);
});
