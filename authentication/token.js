/* eslint-disable no-undef */
import jwt from 'jsonwebtoken';

const { sign } = jwt;

const createAccessToken = (id) => {
  return sign(
    id,
    process.env.ACCESS_TOKEN_SECRET ||
      '125cc5f2296fe32255faff0100f8c2de79d3a65176894a7ef50fccb27e981c4d44d2d0d7b2a62aaeacee32781fe7b5190e6db46f2c7fce20d571bbd5aff87b12e01a8e87dfa964500febf64287c58b05',
    { expiresIn: '60d' }
  );
};

const createRefreshToken = (id) => {
  return sign(
    id,
    process.env.REFRESH_TOKEN_SECRET ||
      'afd45fafb17bc56241bbb33526aa1de342f2b8a7b06c85db04669abafd2b946eed9017e4b25e6ccd34d515cec10d9dbd00f7a36884e3d837fc9797e5813216afcc794da5976cecb32ad03de8f250b57a',
    {
      expiresIn: '60d',
    }
  );
};

const sendAccessToken = (user, req, res, accessToken) => {
  res.json({
    accessToken,
    user,
    message: 'Welcome back to Sterling',
    title: 'Success',
  });
};

const sendRefreshToken = (req, res, refreshToken) => {
  res.json({ refreshToken });
};

export {
  createAccessToken,
  createRefreshToken,
  sendAccessToken,
  sendRefreshToken,
};
