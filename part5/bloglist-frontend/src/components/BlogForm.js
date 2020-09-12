import React from 'react';

const BlogForm = ({ blogForm, handleBlogFormSubmit, handleBlogFormChange }) => {
	return (
		<form method="post" onSubmit={handleBlogFormSubmit}>
			<h3>Add a new blog</h3>
			<div>
				<label htmlFor="title">Title: </label>
				<input type="text" name="title" id="title" value={blogForm.title} onChange={handleBlogFormChange} />
			</div>
			<div>
				<label htmlFor="author">Author: </label>
				<input type="text" name="author" id="author" value={blogForm.author} onChange={handleBlogFormChange} />
			</div>
			<div>
				<label htmlFor="url">Url: </label>
				<input type="text" name="url" id="url" value={blogForm.url} onChange={handleBlogFormChange} />
			</div>
			<button type="submit">Add</button>
		</form>
	)
};

export default BlogForm;
