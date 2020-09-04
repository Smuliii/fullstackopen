const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const loginRouter = require('express').Router();
const User = require('../models/user');
const config = require('../utils/config');

loginRouter.post('/', async (request, response) => {
	const data = request.body;

	const user = await User.findOne({ username: data.username });
	const validPassword = user && await bcrypt.compare(data.password, user.password);

	if (!validPassword) {
		return response.status(401).json({ error: 'Invalid username or password' });
	}

	const tokenPayload = {
		username: user.username,
		id: user._id,
	};

	const token = await jwt.sign(tokenPayload, config.SECRET);

	response.status(200).json({
		username: user.username,
		token,
	});
});

module.exports = loginRouter;
