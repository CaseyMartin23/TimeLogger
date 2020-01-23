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

// <============= Linkedin Strategy =============>
passport.use(
  new LinkedinStrategy(
    {
      clientID: keys.Linkedin.clientID,
      clientSecret: keys.Linkedin.clientSecret,
      callbackURL: "http://localhost:3005/auth/linkedin/redirect"
    },
    (accessToken, refreshToken, profile, done) => {
      console.log("passport callback has fired ...");
      console.log("This is the porfile data => ", profile);
    }
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
    scope: ["r_emailaddress", "r_liteprofile", "w_member_social"]
  })
);

app.get(
  "/auth/linkedin/redirect",
  passport.authenticate("linkedin"),
  (req, res) => {
    res.send("You've reached the redirect URI ...");
  }
);

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
// consumerKey: "86g059et8y7aor",
// consumerSecret: "EPDAbpMZaLiqdKTP",
// callbackURL: "/auth/linkedin/callback"
