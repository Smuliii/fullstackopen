const totalLikes = blogs => (
	blogs.reduce((likes, blog) => likes + blog.likes, 0)
);

const favoriteBlog = blogs => (
	blogs.length
		? blogs.reduce((favorite, blog) => blog.likes > favorite.likes ? blog : favorite)
		: false
);

const mostBlogs = blogs => (
	blogs.length
		? Object.values(blogs.reduce((authors, blog) => {
			if (typeof authors[blog.author] === 'undefined') {
				authors[blog.author] = {
					author: blog.author,
					blogs: 0,
				}
			}
			authors[blog.author].blogs++;
			return authors;
		}, {})).sort((a, b) => b.blogs - a.blogs)[0]
		: false
);

const mostLikes = blogs => (
	blogs.length
		? Object.values(blogs.reduce((authors, blog) => {
			if (typeof authors[blog.author] === 'undefined') {
				authors[blog.author] = {
					author: blog.author,
					likes: 0,
				}
			}
			authors[blog.author].likes += blog.likes;
			return authors;
		}, {})).sort((a, b) => b.likes - a.likes)[0]
		: false
);

module.exports = {
	totalLikes,
	favoriteBlog,
	mostBlogs,
	mostLikes,
}
