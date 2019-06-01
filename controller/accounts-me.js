const AccountModel = require('../model/account');

module.exports = (req, res, next) => {
  return AccountModel
    .find({
      where: { 'email': req.email }, //primary key for user record
      limit: 1,
    })
    .then((list) => {
      let modifiedList = Object.assign({}, list, {auth: true}); //add 'auth: true' to object
      if(list.length) res.send(modifiedList);
      else res.send({ status: 'user not found'});
    })
    .catch(next);
}