import React, { useEffect, useState } from 'react';
import LoginForm from './components/LoginForm';
import UserProfile from './components/UserProfile';
import blogService from './services/blogs';
import loginService from './services/login';

const App = () => {
	const [blogs, setBlogs] = useState([]);
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	const [user, setUser] = useState(null);
	const [blogForm, setBlogForm] = useState({});
	const [notification, setNotification] = useState(null);

	useEffect(() => {
		blogService.getAll().then(blogs => setBlogs(blogs));

		const loggedInUser = window.localStorage.getItem('user');
		if (loggedInUser) {
			setUser(JSON.parse(loggedInUser));
		}
	}, []);

	const flashNotification = (message, error = false) => {
	  setNotification({ message, error })
	  setTimeout(() => setNotification(null), 3000)
	}

	const getUsersBlogs = () => {
		return blogs.filter(blog => blog?.user?.username === user.username);
	};

	const handleUsernameChange = e => {
		setUsername(e.target.value);
	};

	const handlePasswordChange = e => {
		setPassword(e.target.value);
	};

	const handleLogin = async e => {
		e.preventDefault();
		try {
			const user = await loginService.login({ username, password });

			setUser(user);
			setUsername('');
			setPassword('');

			window.localStorage.setItem('user', JSON.stringify(user));
		} catch (e) {
			flashNotification(e.message, true);
		}
	};

	const handleLogOut = () => {
		setUser(null);
		window.localStorage.removeItem('user');
	};

	const handleBlogFormSubmit = async e => {
		e.preventDefault();

		try {
			const blog = await blogService.addNew({
				data: { ...blogForm },
				token: user.token,
			});
			setBlogs(blogs.concat(blog));
			flashNotification(`A new blog '${blog.title}' by ${blog.author} was added!`)
		} catch (e) {
			console.log(e.message)
		}
	};

	const handleBlogFormChange = e => {
		setBlogForm({
			...blogForm,
			[e.target.name]: e.target.value,
		})
	};

	return (
		<div>
			{user
			? <UserProfile blogs={getUsersBlogs()} user={user} blogForm={blogForm} notification={notification} handleLogOut={handleLogOut} handleBlogFormSubmit={handleBlogFormSubmit} handleBlogFormChange={handleBlogFormChange} />
			: <LoginForm username={username} password={password} notification={notification} handleUsernameChange={handleUsernameChange} handlePasswordChange={handlePasswordChange} handleLogin={handleLogin} />}
		</div>
	)
};

export default App;
