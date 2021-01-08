import React, { useEffect, useRef, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { Switch, Route, useRouteMatch, Redirect } from 'react-router-dom';
import LoginForm from './components/LoginForm';
import Blogs from './components/Blogs';
import Users from './components/Users';
import User from './components/User';
import Nav from './components/Nav';
import Blog from './components/Blog';
import blogService from './services/blogs';
import loginService from './services/login';
import userService from './services/users';
import { setBlogs, addBlog, likeBlog,  deleteBlog, updateBlogData } from "./store/blogs";
import { setNotification, removeNotification } from "./store/notification";
import { setUserData, clearUserData } from "./store/user";
import { setUsers } from "./store/users";
import { Container } from "@material-ui/core";

const App = () => {
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	const blogFormRef = useRef();
	const dispatch = useDispatch();
	const blogs = useSelector(state => state.blogs);
	const loggedInUser = useSelector(state => state.user);
	const users = useSelector(state => state.users);
	const blogsMatch = useRouteMatch('/blogs/:id');
	const usersMatch = useRouteMatch('/users/:username');

	useEffect(() => {
		blogService.getAll().then(blogs => dispatch(setBlogs(blogs)));
		userService.getAll().then(users => dispatch(setUsers(users)));

		const loggedInUser = window.localStorage.getItem('user');
		if (loggedInUser) {
			dispatch(setUserData(JSON.parse(loggedInUser)));
		}
	}, [dispatch]);

	const flashNotification = (message, error = false) => {
		dispatch(setNotification({ message, error }))
		setTimeout(() => dispatch(removeNotification(null)), 3000)
	}

	const getUsersBlogs = username => {
		return blogs.filter(blog => blog?.user?.username === username);
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
				token: loggedInUser.token,
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
				comments: blog.comments.map(comment => comment.id),
			};
			delete data.id;

			try {
				const update = await blogService.update({ id, data, token: loggedInUser.token });
				dispatch(likeBlog({ id: update.id, likes: update.likes }));
			} catch (e) {
				flashNotification(e.message, true);
			}
		}
	};

	const handleBlogDelete = async id => {
		if (window.confirm('Are you sure..?')) {
			try {
				await blogService.remove({ id, token: loggedInUser.token, });
				dispatch(deleteBlog(id));
			} catch (e) {
				flashNotification(e.message, true);
			}
		}
	};

	const handleBlogComment = async (id, comment) => {
		const blog = blogs.find(blog => blog.id === id);
		if (blog && typeof comment === 'string') {
			const data = { content: comment };
			try {
				const update = await blogService.addComment({ id, data });
				dispatch(updateBlogData({ id: update.id, data: { comments: update.comments } }));
				return true;
			} catch (e) {
				flashNotification(e.message, true);
				return false;
			}
		}
	}

	return (
		<Container>
			<Nav handleLogOut={handleLogOut} />
			{!loggedInUser ? (
				<LoginForm username={username} password={password} handleUsernameChange={handleUsernameChange} handlePasswordChange={handlePasswordChange} handleLogin={handleLogin} />
			) : (
				<Switch>
					<Route path="/users/:username">
						<User user={users.find(user => user.username === usersMatch?.params.username)} />
					</Route>
					<Route path="/users">
						<Users />
					</Route>
					<Route path="/blogs/:id">
						<Blog blog={blogs.find(blogs => blogs.id === blogsMatch?.params.id)} handleBlogLike={handleBlogLike} handleBlogDelete={handleBlogDelete} handleBlogComment={handleBlogComment} />
					</Route>
					<Route path="/blogs">
						<Blogs blogs={getUsersBlogs(loggedInUser.username)} user={loggedInUser} createNewBlog={createNewBlog} ref={blogFormRef} />
					</Route>
					<Route path="/">
						<Redirect to="/blogs" />
					</Route>
				</Switch>
			)}
		</Container>
	)
};

export default App;
