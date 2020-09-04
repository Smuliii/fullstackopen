const jwt = require('jsonwebtoken');
const config = require('../utils/config');
const User = require('../models/user');

const validateData = (validations = {}) => {
	for (const [error, test] of Object.entries(validations)) {
		if (!test()) {
			return error;
		}
	}
	return false;
}

const validateToken = async request => {
	try {
		const validToken = await jwt.verify(request.token, config.SECRET);
		user = await User.findOne({ username: validToken.username });
		return user;
	} catch (e) {
		return false;
	}
};

module.exports = {
	validateData,
	validateToken,
};
