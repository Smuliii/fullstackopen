import React from 'react';
import Togglable from './Togglable';

const Blog = ({ blog, handleBlogLike, handleBlogDelete }) => {
	const style = {
		border: '2px solid black',
		margin: '0 0 10px',
		padding: '5px',
	};

	return (
		<div style={style}>
			{blog.title}
			<Togglable buttonLabel="Show">
				Likes {blog.likes} <button onClick={() => handleBlogLike(blog.id)}>Like</button><br/>
				<button onClick={() => handleBlogDelete(blog.id)}>Delete</button><br/>
			</Togglable>
		</div>
	)
}

export default Blog;
