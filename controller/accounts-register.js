const Joi = require('joi');
const request = require('request');
const config = require('../config');
const AccountModel = require('../model/account');

const schema = Joi.object().keys({
    email: Joi.string().email().lowercase().required(),
    name: Joi.string().regex(/^[\w ]+$/).required()
});

module.exports = (req, res, next) => {
  const body = schema.validate(req.body);
  if (body.error) return next(body.error);

  return AccountModel
    .create({
        email: body.value.email,
        name: body.value.name
    })
    .then(function() {
      request({
        url: config.host + '/api/accounts/login',
        method: 'POST',
        json: true,
        body: {
          email: body.value.email
        }
      }).pipe(res);
    })
    .catch(next);
}