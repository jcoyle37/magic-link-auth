const AuthService = require('../service/authentication');
const config = require('../config');

module.exports = (req, res) => {
  if (req.user) {
    return new Promise((resolve, reject) => {
      resolve(AuthService.generatePrimary(req.user));
    }).then((primaryToken) => {
      const cookieSettings = {
        maxAge: config.jwt.primaryTokenLifetime * 1000,
        httpOnly: true
      };
      res.cookie('Authorization', primaryToken, cookieSettings);
      res.redirect('/');
    }).catch((error) => {
      throw { 'message': error };
    });
  }
  throw { message: 'not authenticated' };
};








