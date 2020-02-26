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

// <============= Remove Company =============>
app.delete("/remove-company/:compID", async (req, res) => {
  const compID = req.params.compID;

  await knex("companies")
    .where({ company_id: compID })
    .del();

  res.send("Removed Company successfully ...").end();
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

// <============= User Ticket Time Logs =============>
app.post("/start-ticket-timer", async (req, res) => {
  const ticketInfo = req.body;
  console.log("ticketInfo ==> ", ticketInfo);

  await knex("ticket_times")
    .insert({
      ticket_id: ticketInfo.ticket_id,
      ticket_state: ticketInfo.timerState,
      start_time: knex.raw("NOW()")
    })
    .where({ ticket_id: ticketInfo.ticket_id });

  await knex("user_tickets")
    .update({ ticket_state: ticketInfo.timerState })
    .where({ ticket_id: ticketInfo.ticket_id });

  res.send().end();
});

app.put("/start-ticket-timer", async (req, res) => {
  console.log("i just updated ...!");
  const ticketInfo = req.body;

  await knex("ticket_times")
    .where({ ticket_id: ticketInfo.ticket_id })
    .update({
      start_time: knex.raw("NOW()"),
      ticket_state: ticketInfo.timerState
    });

  await knex("user_tickets")
    .where({ ticket_id: ticketInfo.ticket_id })
    .update({ ticket_state: ticketInfo.timerState });

  res.send().end();
});

app.put("/pause-ticket-timer", async (req, res) => {
  const ticketInfo = req.body;
  console.log("ticketInfo ==> ", ticketInfo);

  await knex("ticket_times")
    .where({ ticket_id: ticketInfo.ticket_id })
    .update({
      pause_time: knex.raw("NOW()"),
      ticket_state: ticketInfo.timerState
    });

  const start = await knex("ticket_times")
    .first("start_time")
    .where({ ticket_id: ticketInfo.ticket_id })
    .then(res => res);

  const pause = await knex("ticket_times")
    .first("pause_time")
    .where({ ticket_id: ticketInfo.ticket_id })
    .then(res => res);

  const diffInSecs = dateFns.differenceInSeconds(
    pause.pause_time,
    start.start_time
  );

  await knex("ticket_times")
    .where({ ticket_id: ticketInfo.ticket_id })
    .update({
      elapsed_time: diffInSecs,
      total_time: knex.raw("?? + ??", ["total_time", diffInSecs])
    });

  const ticketTime = await knex("ticket_times")
    .first("total_time")
    .where({ ticket_id: ticketInfo.ticket_id });

  console.log("ticketTime ==> ", ticketTime);

  await knex("user_tickets")
    .where({ ticket_id: ticketInfo.ticket_id })
    .update({
      ticket_state: ticketInfo.timerState,
      ticket_time: ticketTime.total_time
    });

  res.send().end();
});

app.put("/stop-ticket-timer", async (req, res) => {
  const ticketInfo = req.body;
  console.log("ticketInfo ==> ", ticketInfo);

  const ticketState = await knex("user_tickets")
    .first("ticket_state")
    .where({ ticket_id: ticketInfo.ticket_id })
    .then(res => res);

  console.log("ticket state ==> ", ticketState);

  await knex("ticket_times")
    .where({ ticket_id: ticketInfo.ticket_id })
    .update({
      ticket_state: ticketInfo.timerState,
      completed_time: knex.raw("NOW()")
    });

  const completed = await knex("ticket_times")
    .first("completed_time")
    .where({ ticket_id: ticketInfo.ticket_id })
    .then(res => res);

  if (ticketState.ticket_state === "In Progress") {
    const start = await knex("ticket_times")
      .first("start_time")
      .where({ ticket_id: ticketInfo.ticket_id })
      .then(res => res);

    const diffOfStart = dateFns.differenceInSeconds(
      completed.completed_time,
      start.start_time
    );

    await knex("user_tickets")
      .where({ ticket_id: ticketInfo.ticket_id })
      .update({ ticket_state: ticketInfo.timerState });

    return await knex("ticket_times")
      .where({ ticket_id: ticketInfo.ticket_id })
      .update({
        elapsed_time: diffOfStart,
        total_time: knex.raw("?? + ??", ["total_time", diffOfStart])
      });
  }

  if (ticketState.ticket_state === "Paused") {
    const pause = await knex("ticket_times")
      .first("pause_time")
      .where({ ticket_id: ticketInfo.ticket_id })
      .then(res => res);

    const diffOfPause = dateFns.differenceInSeconds(
      completed.completed_time,
      pause.pause_time
    );

    await knex("user_tickets")
      .where({ ticket_id: ticketInfo.ticket_id })
      .update({ ticket_state: ticketInfo.timerState });

    return await knex("ticket_times")
      .where({ ticket_id: ticketInfo.ticket_id })
      .update({
        elapsed_time: diffOfPause,
        total_time: knex.raw("?? + ??", ["total_time", diffOfPause])
      });
  }

  const ticketTime = await knex("ticket_times")
    .first("total_time")
    .where({ ticket_id: ticketInfo.ticket_id });

  await knex("user_tickets")
    .where({ ticket_id: ticketInfo.ticket_id })
    .update({
      ticket_state: ticketInfo.timerState,
      ticket_time: ticketTime.total_time
    });

  res.send().end();
});

app.get("/get-ticket-times/:ticketID", async (req, res) => {
  const ticketID = req.params.ticketID;
  console.log("ticketID ==> ", ticketID);

  const ticketTime = await knex("ticket_times")
    .select("*")
    .where({ ticket_id: ticketID })
    .returning()
    .then(res => res);

  res.send(ticketTime);
});

// <============= Remove Ticket =============>
app.delete("/remove-ticket/:ticket_id", async (req, res) => {
  const ticket_id = req.params.ticket_id;
  console.log("ticket id ==> ", ticket_id);

  await knex("user_tickets")
    .where({ ticket_id: ticket_id })
    .del();

  res.send("Removed ticket successfully ...").end();
});

// <============= Get all data from times =============>
app.get("/get-timelogged-data/:sort", async (req, res) => {
  const sorter = req.params.sort;
  console.log("sorter ===> ", sorter);
  const userTimeLogData = await knex("user_tickets")
    .select(
      "company_id",
      "users.Username",
      "ticket_id",
      "subject_line",
      "description",
      "ticket_state",
      "ticket_time",
      "user_tickets.date_create"
    )
    .join("users", "user_tickets.user_id", "=", "users.user_id")
    .where({ "user_tickets.user_id": req.session.passport.user.user_id });
  console.log("userTimeLogData ==> ", userTimeLogData);

  res.send(userTimeLogData);
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
