import express from "express";
import { PORT } from "./config/constants";
import bodyParser from "body-parser";
import knex from "../db/knex";

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
