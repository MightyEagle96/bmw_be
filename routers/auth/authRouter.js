import express from "express";
import {
  CreateAccount,
  Login,
  GoogleAccount,
} from "../../authentication/authController.js";

const authRouter = express.Router();

authRouter
  .post("/createAccount", CreateAccount)
  .post("/login", Login)
  .post("/googleAccount", GoogleAccount);

export default authRouter;
