"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var constants_1 = require("./src/config/constants");
var path = require("path");
var app = express_1.default();
var cors = require("cors");
var passport = require("passport");
var LinkedInStrategy = require("passport-linkedin");
var chalk = require("chalk");
var user = {};
//!----------------LinkedIn Strategy---------------------!
passport.use(new LinkedInStrategy({
    consumerKey: "86g059et8y7aor",
    consumerSecret: "EPDAbpMZaLiqdKTP",
    callbackUrl: "/auth/linkedin/callback"
}, function (accessToken, refreshToken, profile, cb) {
    console.log(chalk.blue(JSON.stringify(profile)));
    user = __assign({}, profile);
    return cb(null, profile);
}));
app.use(cors());
app.use(passport.initialize());
app.get("/auth/linkedin", passport.authenticate("linkedin"));
app.get("/auth/linkedin/callback", passport.authenticate("linkedin", function (req, res) {
    res.redirect("/profile");
}));
//!----------------Default---------------------!
app.use(express_1.default.static(path.join(__dirname, "build")));
app.get("/user", function (req, res) {
    console.log("getting user data!");
    return res.send(user);
});
app.get("/auth/logout", function (req, res) {
    console.log("logging out!");
    user = {};
    return res.redirect("/");
});
app.get("/", function (req, res) {
    res.sendFile(path.join(__dirname, "build", "index.html"));
});
app.listen(constants_1.PORT, function () {
    console.log("Server is listening on port " + constants_1.PORT);
});
