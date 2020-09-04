const mongoose = require('mongoose');
const blogRouter = require('express').Router();
const Blog = require('../models/blog');
const { validateData, validateToken } = require('../utils/validation');

blogRouter.get('/', async (request, response) => {
	const blogs = await Blog.find({}).populate('user', { username: 1 });
	response.json(blogs);
});

blogRouter.post('/', async (request, response) => {
	const data = request.body;
	const user = await validateToken(request);

	if (!user) {
		return response.status(401).json({ error: 'token is invalid or missing' });
	}

	data.user = user._id;

	// Default to 0 likes
	if (typeof data !== 'number') {
		data.likes = 0;
	}

	const validations = {
		'title is required': () => !!data.title,
		'url is required': () => !!data.url,
	};

	const error = validateData(validations);

	if (error) {
		return response.status(400).json({ error });
	}

	const blog = new Blog(data);
	const result = await blog.save();

	user.blogs = user.blogs.concat(result._id);
	user.save();

	response.status(201).json(result);
});

blogRouter.delete('/:id', async (request, response) => {
	const user = await validateToken(request);
	const deletion = user && await Blog.findOneAndDelete({
		_id: request.params.id,
		user: mongoose.Types.ObjectId(user._id),
	});

	if (!user || !deletion) {
		return response.status(401).json({ error: 'token and/or blog is invalid or missing' });
	}

	// await Blog.findByIdAndDelete(request.params.id);
	response.status(204).end();
});

blogRouter.put('/:id', async (request, response) => {
	const data = await Blog.findByIdAndUpdate(request.params.id, request.body, { new: true }).catch(() => {
		response.status(400).end();
	});

	if (data) {
		response.status(200).json(data);
	}
});

module.exports = blogRouter;
