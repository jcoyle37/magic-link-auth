// server.js
// where your node app starts

// init project
var express = require('express');
var bodyParser = require('body-parser');
var app = express();
const path = require('path');
const config = require('./config');
app.use(bodyParser.urlencoded({ extended: true }));
const cookieParser = require('cookie-parser');
app.use(cookieParser());

const VerifyToken = require('./middleware/VerifyToken');

app.use(require('body-parser').json());
app.use(require('./middleware/authentication').authenticated);

app.get('/api/accounts/init', require('./controller/accounts-init'));
app.get('/api/accounts/me', VerifyToken, require('./controller/accounts-me'));
app.post('/api/accounts/login', require('./controller/accounts-login'));
app.post('/api/accounts/register', require('./controller/accounts-register'));
app.get('/api/accounts/logout', VerifyToken, require('./controller/accounts-logout'));

app.use(express.static(path.join(__dirname, 'build')));

app.get('*', (req, res) => {
  if(req.cookies['Authorization']) {
    res.sendFile(path.join(__dirname+'/public/dashboard.html'));
  } else {
    res.sendFile(path.join(__dirname+'/public/login.html'));
  }
});

var listener = app.listen(process.env.PORT || config.port, function() {
  console.log('Your app is listening on port ' + listener.address().port);
});