const blogRouter = require('express').Router();
const Blog = require('../models/blog');

blogRouter.get('/', async (request, response) => {
	const blogs = await Blog.find({});
	response.json(blogs);
});

blogRouter.post('/', async (request, response) => {
	const data = request.body;

	// Default to 0 likes
	if (typeof data !== 'number') {
		data.likes = 0;
	}

	const validation = {
		'title is required': () => !!data.title,
		'url is required': () => !!data.url,
	};

	let error;

	for (const [msg, test] of Object.entries(validation)) {
		if (!test()) {
			error = msg;
			break;
		}
	}

	if (!error) {
		const blog = new Blog(data);
		const result = await blog.save();
		response.status(201).json(result);
	} else {
		response.status(400).json({ error });
	}
});

blogRouter.delete('/:id', async (request, response) => {
	await Blog.findByIdAndDelete(request.params.id);
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
