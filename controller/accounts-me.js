const AccountModel = require('../model/account');

module.exports = (req, res, next) => {
  return AccountModel
    .find({
      where: { 'email': req.email },
      limit: 1,
    })
    .then((list) => {
      if(list.length) res.json({auth: true, userData: list[0]});
      else throw { message: 'user not found'};
    })
    .catch(next);
}