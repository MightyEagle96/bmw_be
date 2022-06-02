/* eslint-disable no-undef */
import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import morgan from "morgan";
import { ConnectDatabase } from "./database.js";

import { originURL } from "./utils/data.js";
import router from "./router.js";

ConnectDatabase();

dotenv.config({ path: "/.env" });

const app = express();

const PORT = process.env.PORT || 2207;

app.use(express.static("public"));
app.use(cors({ origin: originURL, credentials: true }));
app.use(express.json());
app.use(express.json({ limit: "50mb" }));
app.get("/", (req, res) => {
  res.json({ message: "Server is alive" });
});

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

app.use(router);
app.use("*", (req, res) => {
  res.status(404).json({
    title: "Invalid Route",
    message: "Cannot find this route on this server",
  });
});
app.listen(PORT, () => {
  console.log(`Server is listening on ${PORT}`);
});
