const jwt = require('jsonwebtoken');
const config = require('../config');

function verifyToken(req, res, next) {
	const token = req.cookies['Authorization'];
	if (!token)
		throw { auth: false, message: 'no token provided' };
	jwt.verify(token, config.jwt.secret, function(err, decoded) {
		if (err)
			throw { auth: false, message: 'failed to authenticate token' };
		// if everything good, save to request for use in other routes
		req.email = decoded.email;
		next();
  });
}

module.exports = verifyToken;