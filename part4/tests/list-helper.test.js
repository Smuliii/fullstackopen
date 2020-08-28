const {
	totalLikes,
	favoriteBlog,
	mostBlogs,
	mostLikes,
} = require('../utils/list-helper');

const blogs = [{
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
}, {
	title: "Type wars",
	author: "Robert C. Martin",
	url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
	likes: 2,
}];

describe('totalLikes', () => {
	test('should return zero for empty list', () => {
		const input = [];
		const output = 0;
		expect(totalLikes(input)).toBe(output);
	});

	test('should return likes for list of one blog', () => {
		const input = blogs.slice(0, 1);
		const output = 7;
		expect(totalLikes(input)).toBe(output);
	});

	test('should return sum of likes for list of multiple blogs', () => {
		const input = blogs;
		const output = 36;
		expect(totalLikes(input)).toBe(output);
	});
});

describe('favoriteBlog', () => {
	test('should return blog with most likes', () => {
		const input = blogs;
		const output = {
			title: "Canonical string reduction",
			author: "Edsger W. Dijkstra",
			url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
			likes: 12,
		};
		expect(favoriteBlog(input)).toEqual(output);
	});

	test('should return false for empty list', () => {
		const input = [];
		const output = false;
		expect(favoriteBlog(input)).toBe(output);
	});
});

describe('mostBlogs', () => {
	test('should return author with the most blogs', () => {
		const input = blogs;
		const output = {
			author: "Robert C. Martin",
			blogs: 3
		};
		expect(mostBlogs(input)).toEqual(output);
	});

	test('should return false for empty list', () => {
		const input = [];
		const output = false;
		expect(mostBlogs(input)).toBe(output);
	});
});

describe('mostLikes', () => {
	test('should return author with the most likes', () => {
		const input = blogs;
		const output = {
			author: "Edsger W. Dijkstra",
			likes: 17
		};
		expect(mostLikes(input)).toEqual(output);
	});

	test('should return false for empty list', () => {
		const input = [];
		const output = false;
		expect(mostLikes(input)).toBe(output);
	});
});
