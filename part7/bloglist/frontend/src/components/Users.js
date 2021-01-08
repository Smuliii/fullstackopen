import React from 'react';
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom';
import { Table, TableBody, TableCell, TableHead, TableRow, } from '@material-ui/core';

const Users = () => {
	const users = useSelector(state => state.users);

	if (!users.length) {
		return null;
	}

	return (
		<div>
			<h1>Users</h1>
			<Table>
				<TableHead>
					<TableRow>
						<TableCell></TableCell>
						<TableCell>blogs created</TableCell>
					</TableRow>
				</TableHead>
				<TableBody>
					{users.map(user => (
						<TableRow key={user.username}>
							<TableCell><Link to={`/users/${user.username}`}>{user.name}</Link></TableCell>
							<TableCell>{user.blogs.length}</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
		</div>
	)
};

export default Users;
