const express = require("express");
const bodyParser = require("body-parser");
const passport = require("passport");
const cookieSession = require("cookie-session");
const Linkedin = require("passport-linkedin-oauth2");
const keys = require("../Keys/keys");
const knex = require("../db/knex");
const dateFns = require("date-fns");
const LinkedinStrategy = Linkedin.Strategy;
const app = express();
const PORT = process.env.PORT || 3005;

console.log("Server has started ....");

// <============= Body-Parser =============>
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  next();
});

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

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
      console.log("This user profile from passport ==> ", profile);

      const user = await knex("users")
        .first("*")
        .where({ LinkedinId: profile.id });

      if (user) {
        console.log("This user already exists ...");
        console.log("This user from database ===> ", user);
        return done(null, user);
      }
      console.log("Creating a new user ...");

      await knex("users").insert({
        LinkedinId: profile.id,
        Username: profile.displayName,
        Firstname: profile.name.givenName,
        Lastname: profile.name.familyName,
        UserProfileImg: profile.photos[2].value
      });
      const newUser = await knex("users")
        .first("*")
        .where({ LinkedinId: profile.id });
      console.log("New User Created!");
      return done(null, newUser);
    }
  )
);

// <============= Routes =============>
app.get("/", (req, res, next) => {
  try {
    res.send("I'm up and running ...");
  } catch (e) {
    console.log(e);
    return next(e);
  }
});

app.get("/auth/logout", (req, res, next) => {
  try {
    req.logOut();
    req.session = null;
    res.redirect("http://localhost:3000/login");
  } catch (e) {
    next(e);
  }
});

app.get(
  "/auth/linkedin",
  passport.authenticate("linkedin", {
    scope: ["r_emailaddress", "r_liteprofile", "w_member_social"]
  })
);

app.get(
  "/auth/linkedin/callback",
  passport.authenticate("linkedin", {
    successRedirect: "/",
    failureRedirect: "/login"
  })
);

app.get(
  "/auth/linkedin/redirect",
  passport.authenticate("linkedin"),
  (req, res) => {
    res.redirect("http://localhost:3000/");
  }
);

app.get("/whoami", (req, res, next) => {
  try {
    res.send(req.user);
  } catch (e) {
    return next(e);
  }
});

// <============= Update User Role =============>
app.put("/update-user-role/:role", (req, res, next) => {
  try {
    const paramRole = req.params.role;
    console.log("update-user-param->", paramRole);

    knex("users")
      .update({ UserRole: paramRole })
      .where({ LinkedinId: req.session.passport.user.LinkedinId })
      .returning()
      .then(() => {
        req.session.passport.user = {
          ...req.session.passport.user,
          UserRole: paramRole
        };
        res.send(req.session.passport.user);
      });
  } catch (e) {
    next(e);
  }
});

// <============= Serialization/Deserialization =============>
passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});

// app.use(function(req, res, next) {
//   res.header("Access-Control-Allow-Origin", "*");
//   res.header("Access-Control-Allow-Headers", "X-Requested-With");
//   next();
// });

app.use((err, req, res, next) => {
  console.log(err);
  return res.json({ message: "Broken" });
});
// <============= Server's Port =============>
app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
