/* eslint-disable no-undef */
import Account from "../models/account.js";
import { createAccessToken, sendAccessToken } from "./token.js";
import bcrypt from "bcrypt";
import { OAuth2Client } from "google-auth-library";
import { googleAuth, isAuth } from "./isAuth.js";
import { ErrorHandler } from "../controllers/ErrorController.js";

export const CreateAccount = async (req, res) => {
  try {
    const account = await Account.create(req.body);

    const accessToken = createAccessToken({ id: account._id });

    sendAccessToken(account, req, res, accessToken);
  } catch (error) {
    ErrorHandler(error, res);
  }
};

export const Login = async (req, res) => {
  try {
    //check if the email exists
    const account = await Account.findOne({ email: req.body.email });

    if (!account)
      return res.status(401).json({
        message: "Email address not found",
        title: "Error logging in",
      });

    //check if the password is correct
    if (!(await bcrypt.compare(req.body.password, account.password)))
      return res
        .status(401)
        .json({ message: "Passwords do not match", title: "Error logging in" });
    else {
      const accessToken = createAccessToken({ id: account._id });

      sendAccessToken(account, req, res, accessToken);
    }
  } catch (error) {
    ErrorHandler(error, res);
  }
};

export const GoogleAccount = async (req, res) => {
  const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
  const { tokenId } = req.body;
  const ticket = await client.verifyIdToken({
    idToken: tokenId,
    audience: process.env.GOOGLE_CLIENT_ID,
  });
  const accessToken = tokenId;
  const { name, email, picture } = ticket.getPayload();

  //store the user in the database
  const account = await Account.findOne({ email });
  const user = { name, email, picture };
  if (!account) {
    await Account.create({
      name,
      email,
      picture,
      isVerified: true,
      authenticatedBy: "Google",
    });
  }

  res.status(201).json({
    message: "Welcome back to Sterling",
    title: "Success",
    user,
    accessToken,
  });
};

export const IsLoggedIn = async (req, res, next) => {
  try {
    if (req.headers.authenticatedby === "jwt") {
      const userId = isAuth(req, res);
      if (userId) {
        const account = await Account.findById(userId);
        req.account = account;
      }
      next();
    } else if (req.headers.authenticatedby === "google") {
      const email = await googleAuth(req, res);
      const account = await Account.findOne({ email });
      req.account = account;
      next();
    } else if (req.headers.authorization) {
      const userId = isAuth(req, res);
      if (userId) {
        const account = await Account.findById(userId);
        req.account = account;
      }
      next();
    } else {
      return res.status(401).json({ message: "You are not logged in" });
    }
  } catch (error) {
    return res.status(401).json({ message: "session expired" });
  }
};

export const RestrictTo = (...roles) => {
  return (req, res, next) => {
    try {
      if (!roles.includes(req.account.role)) {
        return res.status(403).json({
          title: "Invalid Permission",
          message: "You do not have permission to perform this action",
        });
      }
      next();
    } catch (error) {
      //ErrorHandler(error, res);
      res
        .status(401)
        .json({ title: "Unauthorized", message: "You are not logged in" });
    }
  };
};
