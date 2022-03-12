/* eslint-disable no-undef */
import Account from "../models/account.js";
import { createAccessToken, sendAccessToken } from "./token.js";
import bcrypt from "bcrypt";
import { OAuth2Client } from "google-auth-library";
import { googleAuth, isAuth } from "./isAuth.js";
import { mailOptions, redirectUrl, sendEmail } from "../email.js";
import { tokenUUID } from "../trial.js";

export const CreateAccount = async (req, res) => {
  try {
    const account = await Account.create(req.body);

    const accessToken = createAccessToken({ id: account._id });

    sendAccessToken(account, req, res, accessToken);

    const token = `${tokenUUID}-${account._id}`;
    const mailHeaders = mailOptions(
      req.body.name.split(" ")[0],
      req.body.email,
      redirectUrl(token)
    );

    sendEmail(mailHeaders);
  } catch (error) {
    console.error({ error });
    if (error) res.status(400).json({ message: "Something bad happened" });
  }
};

export const Login = async (req, res) => {
  try {
    //check if the email exists
    const account = await Account.findOne({ email: req.body.email });

    if (!account) res.status(401).json({ message: "Email address not found" });

    //check if the password is correct
    if (!(await bcrypt.compare(req.body.password, account.password)))
      return res.status(401).json({ message: "Passwords do not match" });

    const accessToken = createAccessToken({ id: account._id });

    sendAccessToken(account, req, res, accessToken);
  } catch (error) {
    console.log(error);
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
    } else if (req.headers.authenticatedby === "google") {
      const email = await googleAuth(req, res);
      const account = await Account.findOne({ email });
      req.account = account;
    }
  } catch (error) {
    return res.status(401).json({ message: "invalid token" });
  }
  next();
};
