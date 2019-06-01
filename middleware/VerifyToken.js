const jwt = require('jsonwebtoken');
const config = require('../config');

function VerifyToken(req, res, next) {
	const token = req.cookies['Authorization'];
	if (!token)
		return res.status(403).send({ auth: false, message: 'no token provided' });
	jwt.verify(token, config.jwt.secret, function(err, decoded) {
		if (err)
			return res.status(500).send({ auth: false, message: 'failed to authenticate token' });
		// if everything good, save to request for use in other routes
		req.email = decoded.email;
		next();
  });
}

module.exports = VerifyToken;