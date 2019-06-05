const nodemailer = require('nodemailer');
const config = require('../config');

var smtpConfig = {
  host: config.mail.url,
  port: config.mail.port,
  secure: config.mail.useSSL,
  auth: {
    user: config.mail.user,
    pass: config.mail.password
  }
};

const transporter = nodemailer.createTransport(smtpConfig);

const create = (options) =>
  transporter.sendMail(options);

module.exports = { create };