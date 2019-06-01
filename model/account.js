const db = require('../service/database');

db.raw('select 1+1 as result').then(function () {
  console.log('Database connection successful');
});

//todo: create only one of each e-mail
const create = (body) => {
  return db('user')
    .insert(body)
    .returning('*');
};

const find = (filter) => {
  return db
    .select('*')
    .from('user')
    .where(filter.where)
    .limit(filter.limit || 20)
    .offset(filter.offset || 0);
};

module.exports = {
  create,
  find,
};