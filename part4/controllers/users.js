const userRouter = require('express').Router();
const User = require('../models/user');
const bcrypt = require('bcrypt');
const { validateData } = require('../utils/validation');

userRouter.get('/', async (request, response) => {
	const users = await User.find({}).populate('blogs', { title: 1, likes: 1, });
	response.json(users);
});

userRouter.post('/', async (request, response) => {
	const data = request.body;

	const validations = {
		'password must be at least 3 characters': () => (
			!!data.password && data.password.length >= 3
		),
	};

	const error = validateData(validations);

	if (error) {
		return response.status(400).json({ error });
	}

	const passwordHash = await bcrypt.hash(data.password, 10);
	data.password = passwordHash;

	try {
		const user = new User(data);
		const savedUser = await user.save();
		response.status(201).json(savedUser);
	} catch (e) {
		response.status(400).json({ error: e.message });
	}
});

module.exports = userRouter;
