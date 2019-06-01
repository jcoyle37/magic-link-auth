const knex = require('knex');

//see https://knexjs.org/#Installation-client for different db connection types

// init sqlite database
const fs = require('fs');
const dbFile = './sqlite.db';
const exists = fs.existsSync(dbFile);
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database(dbFile);

db.serialize(function() {
  //if ../sqlite.db does not exist, create it
  if (!exists) {
    db.serialize(function() {
      db.run('CREATE TABLE User (email TEXT, name TEXT);', function(res) {
        console.log('Created table User');
      });
      //db.run('INSERT INTO User (email, name) VALUES ("email@email.com", "Joe Cool")'); // insert default user
    });
  } else {
    console.log('Table User already created');
  }

  //logs all current records in database to console
  db.each('SELECT * from User', function(err, row) {
    if (row) {
      console.log('Database record:', row);
    }
  });
});

module.exports = knex({
  client: 'sqlite3',
  connection: {
    filename: dbFile
  }
});

