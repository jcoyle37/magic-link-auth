const db = require('../service/database');

db.raw('select 1+1 as result').then(function () {
  console.log('Database connection successful');
});

const create = (body) => {
  return new Promise((resolve, reject) => {
    resolve(db
      .select('*')
      .from('user')
      .where({email: body.email})); //check to see if user exists
  }).then((res) => {
    if(res.length > 0) {
      return {error: 'true', message: 'user already registered'};
    } else {
      return db('user')
        .insert(body)
        .returning('*');
    }
  }).catch((error) => {
    if(error.responseText)
      return {error: 'true', message: error.responseText};
  });
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