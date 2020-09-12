import React from 'react';
import Blog from './Blog';
import BlogForm from './BlogForm';
import Notification from './Notification';

const BlogList = ({ blogs, user, blogForm, notification, handleLogOut, handleBlogFormSubmit, handleBlogFormChange }) => {
	return (
		<div>
			<h2>Hello, {user.name}</h2>
			<Notification notification={notification} />
			<button onClick={handleLogOut}>Logout</button>
			<BlogForm blogForm={blogForm} handleBlogFormSubmit={handleBlogFormSubmit} handleBlogFormChange={handleBlogFormChange} />
			<h3>Blogs</h3>
			<ul>
				{blogs.map(blog => <Blog key={blog.id} blog={blog} />)}
			</ul>
		</div>
	)
};

export default BlogList;
