/* eslint-disable no-undef */
import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();
const DATABASE_LOCAL = process.env.DATABASE_LOCAL;
const DATABASE_ONLINE = process.env.DATABASE_ONLINE;

const DATABASE =
  process.env.NODE_ENV === "production" ? DATABASE_ONLINE : DATABASE_LOCAL;

export const ConnectDatabase = () => {
  mongoose
    .connect(DATABASE, {})
    .then(() => {
      console.log("Database connected successfully");
    })
    .catch((e) => {
      console.log(e);
      console.log("DB could not connect at this time. Shutting down");
      process.exit(1);
    });
};
