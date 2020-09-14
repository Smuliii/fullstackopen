import React from 'react';
import Blog from './Blog';
import BlogForm from './BlogForm';
import Notification from './Notification';
import Togglable from './Togglable';

const UserProfile = React.forwardRef(({ blogs, user, notification, handleLogOut, handleBlogLike, handleBlogDelete, createNewBlog }, ref) => {
	return (
		<div>
			<h2>Hello, {user.name}</h2>
			<Notification notification={notification} />
			<button onClick={handleLogOut}>Logout</button>
			<Togglable labelShow="Add new blog" labelHide="Cancel" ref={ref}>
				<BlogForm createNewBlog={createNewBlog} />
			</Togglable>
			<h3>Blogs</h3>
			<div>
				{blogs.sort((a, b) => b.likes - a.likes).map(blog => (
					<Blog key={blog.id} blog={blog} handleBlogLike={handleBlogLike} handleBlogDelete={handleBlogDelete} />
				))}
			</div>
		</div>
	)
});

export default UserProfile;
