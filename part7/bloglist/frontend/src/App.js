import React, { useEffect, useRef, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import LoginForm from './components/LoginForm';
import UserProfile from './components/UserProfile';
import blogService from './services/blogs';
import loginService from './services/login';
import { setBlogs, addBlog, likeBlog,  deleteBlog } from "./store/blogs";
import { setNotification, removeNotification } from "./store/notification";
import { setUserData, clearUserData } from "./store/user";

const App = () => {
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	const blogFormRef = useRef();
	const dispatch = useDispatch();
	const blogs = useSelector(state => state.blogs);
	const user = useSelector(state => state.user);

	useEffect(() => {
		blogService.getAll().then(blogs => dispatch(setBlogs(blogs)));

		const loggedInUser = window.localStorage.getItem('user');
		if (loggedInUser) {
			dispatch(setUserData(JSON.parse(loggedInUser)));
		}
	}, []);

	const flashNotification = (message, error = false) => {
		dispatch(setNotification({ message, error }))
		setTimeout(() => dispatch(removeNotification(null)), 3000)
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

			dispatch(setUserData(user));
			setUsername('');
			setPassword('');

			window.localStorage.setItem('user', JSON.stringify(user));
		} catch (e) {
			flashNotification(e.message, true);
		}
	};

	const handleLogOut = () => {
		dispatch(clearUserData());
		window.localStorage.removeItem('user');
	};

	const createNewBlog = async blogData => {
		try {
			const blog = await blogService.addNew({
				data: { ...blogData },
				token: user.token,
			});
			dispatch(addBlog(blog));
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
				dispatch(likeBlog({ id: update.id, likes: update.likes }));
			} catch (e) {
				flashNotification(e.message, true);
			}
		}
	};

	const handleBlogDelete = async id => {
		if (window.confirm('Are you sure..?')) {
			try {
				await blogService.remove({ id, token: user.token, });
				dispatch(deleteBlog(id));
			} catch (e) {
				flashNotification(e.message, true);
			}
		}
	};

	return (
		<div>
			{user
			? <UserProfile blogs={getUsersBlogs()} user={user}
				handleLogOut={handleLogOut} handleBlogLike={handleBlogLike} handleBlogDelete={handleBlogDelete} createNewBlog={createNewBlog} ref={blogFormRef} />
			: <LoginForm username={username} password={password}
				handleUsernameChange={handleUsernameChange} handlePasswordChange={handlePasswordChange} handleLogin={handleLogin} />}
		</div>
	)
};

export default App;
