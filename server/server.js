const express = require("express");
const app = express();
// const app = require("express").Router();
const passport = require("passport");
const session = require("express-session");
const LinkedinStrategy = require("passport-linkedin-oauth2").Strategy;
const keys = require("./Keys/keys");
const PORT = process.env.PORT || 3005;
var knex = require("../db/knex");

// <============= Default Express =============>
console.log("Server has started ....");
app.get("/", function(req, res) {
  res.send("Hello");
});

// <============= Database Operations ============>
app.get("/todos", (req, res) => {
  console.log("getting todos");
  knex
    .select()
    .from("todos")
    .then(todos => {
      res.send(todos);
    });
});

app.get("/users", (req, res) => {
  console.log("getting users");
  knex
    .select()
    .from("users")
    .then(users => {
      res.send(users);
    });
});

app.get("/something/else", (req, res) => res.send("This is another app ..."));

// <============= Linkedin Strategy =============>
passport.use(
  new LinkedinStrategy(
    {
      clientID: keys.Linkedin.clientID,
      clientSecret: keys.Linkedin.clientSecret,
      callbackURL: "https://localhost:3000/auth/linkedin/callback"
    },
    (accessToken, refreshToken, profile, done) => {}
  )
);

// <============= Routes =============>
app.get("/auth/logout", (req, res) => {
  // handle with passport
  res.send("Logging out....");
});

app.get(
  "/auth/linkedin",
  passport.authenticate("linkedin", {
    scope: ["profile"]
  })
);

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
// consumerKey: "86g059et8y7aor",
// consumerSecret: "EPDAbpMZaLiqdKTP",
// callbackURL: "/auth/linkedin/callback"
