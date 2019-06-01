const jwt = require('jsonwebtoken');
const config = require('../config');

const generateInit = (account) => {
  console.log("creating init token for user email " + account.email + "; expiresIn " + config.jwt.initTokenLifetime);
  return Promise.resolve(
    jwt.sign(
      {
        email: account.email
      },
      config.jwt.secret,
      {
        expiresIn: config.jwt.initTokenLifetime
      }
    )
  );
};

const generatePrimary = (account) => {
  console.log("creating primary token with email " + account.email + "; expiresIn " + config.jwt.primaryTokenLifetime);
  return Promise.resolve(
    jwt.sign(
      {
        email: account.email
      },
      config.jwt.secret,
      {
        expiresIn: config.jwt.primaryTokenLifetime
      }
    )
  );
};

module.exports = { generateInit, generatePrimary };