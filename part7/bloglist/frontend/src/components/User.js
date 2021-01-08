import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { List, ListItem } from '@material-ui/core';

const User = ({ user }) => {
	if (!user) {
		return null;
	}

	return (
		<div>
			<h1>{user.name}</h1>
			<h3>added blogs</h3>
			<List>
				{user.blogs.map(blog => (
				<ListItem button component={RouterLink} to={`/blogs/${blog.id}`}>{blog.title}</ListItem>
				))}
			</List>
		</div>
	)
}

export default User;
