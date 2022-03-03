/* eslint-disable no-undef */
import jwt from 'jsonwebtoken';
const { verify } = jwt;
import { OAuth2Client } from 'google-auth-library';
const isAuth = (req, res) => {
  const authorization = req.headers['authorization'];
  if (!authorization)
    return res.status(401).json({ message: 'You are not logged in' });

  const token = authorization.split(' ')[1];
  const { id } = verify(
    token,
    // eslint-disable-next-line no-undef
    process.env.ACCESS_TOKEN_SECRET ||
      '125cc5f2296fe32255faff0100f8c2de79d3a65176894a7ef50fccb27e981c4d44d2d0d7b2a62aaeacee32781fe7b5190e6db46f2c7fce20d571bbd5aff87b12e01a8e87dfa964500febf64287c58b05'
  );

  return id;
};

const googleAuth = async (req, res) => {
  const authorization = req.headers['authorization'];
  if (!authorization)
    return res.status(401).json({ message: 'You are not logged in' });

  const token = authorization.split(' ')[1];

  const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

  const ticket = await client.verifyIdToken({
    idToken: token,
    audience: process.env.GOOGLE_CLIENT_ID,
  });

  const { email } = ticket.getPayload();

  return email;
};
export { isAuth, googleAuth };
