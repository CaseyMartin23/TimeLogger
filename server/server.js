const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const passport = require("passport");
const cookieSession = require("cookie-session");
const LinkedinStrategy = require("passport-linkedin-oauth2").Strategy;
const keys = require("../Keys/keys");
const knex = require("../db/knex");
const PORT = process.env.PORT || 3005;

console.log("Server has started ....");

// <============= Body-Parser =============>
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
app.get("/auth/logout", (req, res) => {
  req.logOut();
  req.session = null;
  res.redirect("http://localhost:3000/login");
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
    res.redirect("http://localhost:3000/");
  }
);

app.get("/whoami", (req, res) => {
  res.send(req.session.passport.user);
});

// <============= Update User Role =============>
app.put("/update-user-role/:role", (req, res) => {
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
});

// <============= Ticket Info =============>
// app.put("/ticket-info/:ticketInfo", (req, res) => {
//   const ticketInfo = req.params.ticketInfo;

//   knex("user_tickets").update({
//     subject_line: ticketInfo.ticketSub,
//     description: ticketInfo.ticketDescript
//   });
// });

// <============= Company Creation on Database =============>
app.post("/add-company", async (req, res) => {
  const companyInfo = req.body;
  console.log("company info ==> ", companyInfo);

  await knex("companies").insert({
    user_id: companyInfo.user_id,
    company_name: companyInfo.company_name
  });

  res.send("Created Company successfully !").end();
});

// <============= Getting Companies =============>
app.get("/users-companies", async (req, res) => {
  const companies = await knex("companies")
    .select("*")
    .where({ user_id: req.session.passport.user.user_id })
    .returning()
    .then(res => res);
  console.log("All user companies created ==> ", companies);

  res.send(companies);
});

// <============= Ticket Creation on Database =============>
app.post("/add-ticket", async (req, res) => {
  const ticketInfo = req.body;
  console.log("req.body response ==> ", ticketInfo);

  await knex("user_tickets").insert({
    user_id: req.session.passport.user.user_id,
    company_id: ticketInfo.company_id,
    subject_line: ticketInfo.subject_line,
    description: ticketInfo.description
  });
  res.send("Created ticket successfully !!!").end();
});

// <============= Getting Ticket Info Form Database =============>
app.get("/users-company-tickets/:companyID", async (req, res) => {
  const usersCompTickets = await knex("user_tickets")
    .select("*")
    .where({
      user_id: req.session.passport.user.user_id,
      company_id: req.params.companyID
    })
    .returning()
    .then(res => res);
  console.log("all user tickets for company ==> ", usersCompTickets);

  res.send(usersCompTickets);
});

app.get("/selected-ticket/:ticketID", async (req, res) => {
  const ticketID = req.params.ticketID;

  const ticket = await knex("user_tickets")
    .select("*")
    .where({ ticket_id: ticketID })
    .returning()
    .then(res => res);
  console.log("ticket returned ==> ", ticket);

  res.send(ticket);
});

app.get("/users-tickets", (req, res) => {});

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
