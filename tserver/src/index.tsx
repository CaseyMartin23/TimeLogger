import express from "express";
import { PORT } from "./config/constants";

const path = require("path");
const app = express();
const cors = require("cors");
const passport = require("passport");
const LinkedInStrategy = require("passport-linkedin");
const chalk = require("chalk");
let user = {};

//!----------------LinkedIn Strategy---------------------!
passport.use(
  new LinkedInStrategy(
    {
      consumerKey: "86g059et8y7aor",
      consumerSecret: "EPDAbpMZaLiqdKTP",
      callbackUrl: "/auth/linkedin/callback"
    },
    (accessToken: string, refreshToken: string, profile: {}, cb: any) => {
      console.log(chalk.blue(JSON.stringify(profile)));
      user = { ...profile };
      return cb(null, profile);
    }
  )
);

app.use(cors());
app.use(passport.initialize());
app.get("/auth/linkedin", passport.authenticate("linkedin"));
app.get(
  "/auth/linkedin/callback",
  passport.authenticate("linkedin", (req: any, res: any) => {
    res.redirect("/profile");
  })
);

//!----------------Default---------------------!
app.use(express.static(path.join(__dirname, "build")));

app.get("/user", function(req: any, res: any) {
  console.log("getting user data!");
  return res.send(user);
});

app.get("/auth/logout", function(req: any, res: any) {
  console.log("logging out!");
  user = {};
  return res.redirect("/");
});

app.get("/", function(req: any, res: any) {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
