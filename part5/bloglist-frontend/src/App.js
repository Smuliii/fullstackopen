import React, { useEffect, useRef, useState } from 'react';
import LoginForm from './components/LoginForm';
import UserProfile from './components/UserProfile';
import blogService from './services/blogs';
import loginService from './services/login';

const App = () => {
	const [blogs, setBlogs] = useState([]);
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	const [user, setUser] = useState(null);
	const [notification, setNotification] = useState(null);
	const blogFormRef = useRef();

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

	const createNewBlog = async blogData => {
		try {
			const blog = await blogService.addNew({
				data: { ...blogData },
				token: user.token,
			});
			setBlogs(blogs.concat(blog));
			flashNotification(`A new blog '${blog.title}' by ${blog.author} was added!`)
			blogFormRef.current.toggleVisibility();
			return true;
		} catch (e) {
			flashNotification(e.message, true);
			return false;
		}
	};

	const handleBlogLike = async id => {
		const blog = blogs.find(blog => blog.id === id);
		if (blog) {
			const data = {
				...blog,
				likes: blog.likes + 1,
				user: blog.user.id,
			};
			delete data.id;

			try {
				const update = await blogService.update({ id, data, token: user.token });
				setBlogs(blogs.map(blog => ({
					...blog,
					likes: blog.id === update.id ? update.likes : blog.likes,
				})));
			} catch (e) {
				flashNotification(e.message, true);
			}
		}
	};

	const handleBlogDelete = async id => {
		if (window.confirm('Are you sure..?')) {
			try {
				await blogService.remove({ id, token: user.token, });
				setBlogs(blogs.filter(blog => blog.id !== id));
			} catch (e) {
				flashNotification(e.message, true);
			}
		}
	};

	return (
		<div>
			{user
			? <UserProfile blogs={getUsersBlogs()} user={user} notification={notification}
				handleLogOut={handleLogOut} handleBlogLike={handleBlogLike} handleBlogDelete={handleBlogDelete} createNewBlog={createNewBlog} ref={blogFormRef} />
			: <LoginForm username={username} password={password} notification={notification}
				handleUsernameChange={handleUsernameChange} handlePasswordChange={handlePasswordChange} handleLogin={handleLogin} />}
		</div>
	)
};

export default App;
