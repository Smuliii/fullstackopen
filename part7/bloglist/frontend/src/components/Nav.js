import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { useSelector } from 'react-redux'
import { AppBar, Toolbar, Button } from '@material-ui/core';

const Nav = ({ handleLogOut }) => {
	const user = useSelector(state => state.user);

	return (
		<AppBar position="static">
			<Toolbar style={{ justifyContent: 'space-between' }}>
				<div>
					<Button color="inherit" component={RouterLink} to="/blogs">blogs</Button>
					<Button color="inherit" component={RouterLink} to="/users">users</Button>
				</div>
				{user ? (
					<Button variant="contained" onClick={handleLogOut}>Logout ({user.name})</Button>
				) : null}
			</Toolbar>
		</AppBar>
	)
}

export default Nav;
