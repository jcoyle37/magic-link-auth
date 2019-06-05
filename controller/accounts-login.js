const Joi = require('joi');
const config = require('../config');
const AccountModel = require('../model/account');
const AuthService = require('../service/authentication');
const MailService = require('../service/mail');

const schema = Joi.object().keys({
  email: Joi.string().email().lowercase().required(),
});

module.exports = (req, res, next) => {
  const body = schema.validate(req.body);
  if (body.error) return next(body.error);

 return AccountModel
    .find({
      where: body.value,
      limit: 1,
    })
    .then((list) => {
      if(list.length) {
        return list;
      }
      else throw { message: 'user not found' };
    })
    .then((list) => AuthService.generateInit(list[0]))
    .then((token) => MailService.create({
      from: config.mail.sender,
      to: body.value.email,
      subject: 'Your Login Link',
      html: `
        <h1>Login</h1>
        <p>Click the following link to log in (it will expire in 5 minutes)</p>
        <a href="${config.host}/api/accounts/init?token=${encodeURIComponent(token)}">
          ${config.host}/api/accounts/init?token=${encodeURIComponent(token)}
        </a>
      `,
      text: `Login Link (it will expire in 5 minutes): ${config.host}/api/accounts/init?token=${encodeURIComponent(token)}`,
    }))
    .then(() => res.json({ message: 'email sent' }))
    .catch(next);
}