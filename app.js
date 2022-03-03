/* eslint-disable no-undef */
import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import morgan from "morgan";
import { ConnectDatabase } from "./database.js";
import authRouter from "./routers/auth/authRouter.js";

ConnectDatabase();

dotenv.config();

const app = express();

const PORT = process.env.PORT || 2207;

app.use(express.static("public"));

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

app.use(cors());
app.use(express.json());
app.use(express.json({ limit: "50mb" }));

app.get("/", (req, res) => {
  res.json({ message: "Server is alive" });
});
app.use(authRouter);
app.use("*", (req, res) => {
  res.json({ message: "Cannot find this route on this server" });
});
app.listen(PORT, () => {
  console.log(`Server is listening on ${PORT}`);
});