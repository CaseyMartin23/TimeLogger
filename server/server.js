const express = require("express");
const app = express();
// const app = require("express").Router();
const passport = require("passport");
const cookieSession = require("cookie-session");
const LinkedinStrategy = require("passport-linkedin-oauth2").Strategy;
const keys = require("../Keys/keys");
const knex = require("../db/knex");
const PORT = process.env.PORT || 3005;

console.log("Server has started ....");

// <============= Cookies Session =============>
app.use(
  cookieSession({
    maxAge: 24 * 60 * 60 * 1000,
    keys: [keys.session.cookieKey]
  })
);

// <============= Intialize Passport =============>
app.use(passport.initialize());
app.use(passport.session());

// <============= Linkedin Strategy =============>
passport.use(
  new LinkedinStrategy(
    {
      clientID: keys.Linkedin.clientID,
      clientSecret: keys.Linkedin.clientSecret,
      callbackURL: "http://localhost:3005/auth/linkedin/redirect"
    },
    async (accessToken, refreshToken, profile, done) => {
      console.log(
        `<===== Got ${profile.name.givenName}'s Profile Data ... =====>`
      );

      const user = await knex("users")
        .first("*")
        .where({ LinkedinId: profile.id });

      if (user) {
        console.log("This user already exists ...");
        console.log("This user from database ===> ", user);
        return done(null, user);
      }
      console.log("Creating a new user ...");
      const newUser = await knex("users").insert({
        LinkedinId: profile.id,
        Username: profile.displayName,
        Firstname: profile.name.givenName,
        Lastname: profile.name.familyName
      });
      return done(null, newUser);
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
    res.redirect("http://localhost:3000/Home");
  }
);

app.get("/whoami", (req, res) => {
  console.log(
    "This is the user info in session ==> ",
    req.session.passport.user
  );
  res.send(req.session.passport.user);
});

// <============= Serialization/Deserialization =============>
passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});

// <============= Server's Port =============>
app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
