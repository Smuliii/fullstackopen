const supertest = require('supertest');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const app = require('../app');
const Blog = require('../models/blog');
const User = require('../models/user');

const api = supertest(app);

const userLogin = async user => {
	return await api
		.post('/api/login')
		.send({
			username: user.username,
			password: user.password,
		});
};

const initialBlogs = [{
	title: "React patterns",
	author: "Michael Chan",
	url: "https://reactpatterns.com/",
	likes: 7,
}, {
	title: "Go To Statement Considered Harmful",
	author: "Edsger W. Dijkstra",
	url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
	likes: 5,
}, {
	title: "Canonical string reduction",
	author: "Edsger W. Dijkstra",
	url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
	likes: 12,
}, {
	title: "First class tests",
	author: "Robert C. Martin",
	url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
	likes: 10,
}, {
	title: "TDD harms architecture",
	author: "Robert C. Martin",
	url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
	likes: 0,
}];

const newBlog = {
	title: "Type wars",
	author: "Robert C. Martin",
	url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
	likes: 2,
};

const user = {
	username: 'johndoe',
	password: 'secret',
	name: 'John Doe',
}

beforeEach(async () => {
	// Add dummy data
	await Blog.deleteMany({});
	await Blog.insertMany(initialBlogs);
	await User.deleteMany({});
	await new User({
		...user,
		password: await bcrypt.hash(user.password, 10),
	}).save();
});

test('should return blog list as json', async () => {
	await api
		.get('/api/blogs')
		.expect(200)
		.expect('Content-Type', /application\/json/);
});

test('should contain all initial blogs', async () => {
	const response = await api.get('/api/blogs');

	expect(response.body).toHaveLength(initialBlogs.length);
});

test('should have id property for every blog', async () => {
	const response = await api.get('/api/blogs');

	response.body.forEach(blog => {
		expect(blog.id).toBeDefined();
	});
});

test('should create a new blog item succesfully', async () => {
	const login = await userLogin(user);
	const response = await api
		.post('/api/blogs')
		.send(newBlog)
		.set('Authorization', `Bearer ${login.body.token}`)
		.expect(201)
		.expect('Content-Type', /application\/json/);

	expect(response.body.id).toBeDefined();
	expect(response.body.title).toBe(newBlog.title);

	const { body: updatedBlogs } = await api.get('/api/blogs');

	expect(updatedBlogs).toHaveLength(initialBlogs.length + 1);
});

test('should default to 0 if likes are missing', async () => {
	const newBlogWithoutLikes = { ...newBlog };
	delete newBlogWithoutLikes.likes;

	const login = await userLogin(user);
	const response = await api
		.post('/api/blogs')
		.send(newBlogWithoutLikes)
		.set('Authorization', `Bearer ${login.body.token}`)
		.expect(201);

	expect(response.body.likes).toBeDefined();
});

test('should give error if title is missing', async () => {
	const newBlogWithoutLikes = { ...newBlog };
	delete newBlogWithoutLikes.title;

	const login = await userLogin(user);
	await api
		.post('/api/blogs')
		.send(newBlogWithoutLikes)
		.set('Authorization', `Bearer ${login.body.token}`)
		.expect(400);
});

test('should give error if url is missing', async () => {
	const newBlogWithoutLikes = { ...newBlog };
	delete newBlogWithoutLikes.url;

	const login = await userLogin(user);
	await api
		.post('/api/blogs')
		.send(newBlogWithoutLikes)
		.set('Authorization', `Bearer ${login.body.token}`)
		.expect(400);
});

test('should delete blog item succesfully', async () => {
	const { body: blogs } = await api.get('/api/blogs');

	const login = await userLogin(user);
	await api
		.delete(`/api/blogs/${blogs[0].id}`)
		// TODO: supertest's delete method won't accept headers..?
		.set('Authorization', `Bearer ${login.body.token}`)
		.expect(204);

	const { body: updatedBlogs } = await api.get('/api/blogs');

	expect(updatedBlogs).toHaveLength(initialBlogs.length - 1);
});

test('should update blog item succesfully', async () => {
	const { body: blogs } = await api.get('/api/blogs');
	const data = {
		...blogs[0],
		likes: 99,
	};

	const response = await api
		.put(`/api/blogs/${data.id}`)
		.send(data)
		.expect(200);

	expect(response.body.likes).toBe(data.likes);
});

test('should give error if token is missing', async () => {
	await api
		.post('/api/blogs')
		.send(newBlog)
		.expect(401);
});

test('should return token for valid user', async () => {
	await api
		.post('/api/login')
		.send({
			username: user.username,
			password: user.password,
		})
		.expect(200)
		.expect('Content-Type', /application\/json/);
});

afterAll(() => mongoose.connection.close());
