"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var constants_1 = require("./src/config/constants");
var bodyParser = require("body-parser");
var path = require("path");
var app = express_1.default();
app.use(express_1.default.static(path.join(__dirname, "build")));
app.get("/ping", function (req, res) {
    return res.send("pong");
});
app.get("/", function (req, res) {
    res.sendFile(path.join(__dirname, "build", "index.html"));
});
app.listen(constants_1.PORT, function () {
    console.log("Server is listening on port " + constants_1.PORT);
});
