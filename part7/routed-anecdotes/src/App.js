import React, { useState } from 'react';
import { Link, Route, Switch, useHistory, useRouteMatch } from 'react-router-dom';
import { useField } from "./hooks/index";

const Menu = () => {
	const padding = {
		paddingRight: 5
	}
	return (
		<div>
			<Link to='/' style={padding}>anecdotes</Link>
			<Link to='/create' style={padding}>create new</Link>
			<Link to='/about' style={padding}>about</Link>
		</div>
	)
}

const Notification = ({ content }) => (
	<p>{content}</p>
)

const Anecdote = ({ anecdote }) => {
	if (!anecdote) {
		return (<p>Anecdote not found!</p>)
	}

	const { id, content, author, info, votes } = anecdote;
	return (
		<div>
			<h2>{content} by {author}</h2>
			<p>has {votes} votes</p>
			<p>for more info see: <a href={info} target="_blank">{info}</a></p>
		</div>
	)
}

const AnecdoteList = ({ anecdotes }) => (
	<div>
		<h2>Anecdotes</h2>
		<ul>
			{anecdotes.map(anecdote => <li key={anecdote.id} ><Link to={`/anecdotes/${anecdote.id}`}>{anecdote.content}</Link></li>)}
		</ul>
	</div>
)

const About = () => (
	<div>
		<h2>About anecdote app</h2>
		<p>According to Wikipedia:</p>

		<em>An anecdote is a brief, revealing account of an individual person or an incident.
			Occasionally humorous, anecdotes differ from jokes because their primary purpose is not simply to provoke laughter but to reveal a truth more general than the brief tale itself,
			such as to characterize a person by delineating a specific quirk or trait, to communicate an abstract idea about a person, place, or thing through the concrete details of a short narrative.
			An anecdote is "a story with a point."</em>

		<p>Software engineering is full of excellent anecdotes, at this app you can find the best and add more.</p>
	</div>
)

const Footer = () => (
	<div>
		Anecdote app for <a href='https://courses.helsinki.fi/fi/tkt21009'>Full Stack -websovelluskehitys</a>.

		See <a href='https://github.com/fullstack-hy2020/routed-anecdotes/blob/master/src/App.js'>https://github.com/fullstack-hy2019/routed-anecdotes/blob/master/src/App.js</a> for the source code.
	</div>
)

const CreateNew = (props) => {
	const content = useField('text', 'content')
	const author = useField('text', 'author')
	const info = useField('text', 'info')

	const handleSubmit = (e) => {
		e.preventDefault()
		props.addNew({
			content: content.field.value,
			author: author.field.value,
			info: info.field.value,
			votes: 0
		})
	}

	const handleReset = (e) => {
		content.reset()
		author.reset()
		info.reset()
	}

	return (
		<div>
			<h2>create a new anecdote</h2>
			<form onSubmit={handleSubmit} onReset={handleReset}>
				<div>
					content
					<input {...content.field} />
				</div>
				<div>
					author
					<input {...author.field} />
				</div>
				<div>
					url for more info
					<input {...info.field} />
				</div>
				<button>create</button>
				<button type="reset">reset</button>
			</form>
		</div>
	)

}

const App = () => {
	const [anecdotes, setAnecdotes] = useState([
		{
			content: 'If it hurts, do it more often',
			author: 'Jez Humble',
			info: 'https://martinfowler.com/bliki/FrequencyReducesDifficulty.html',
			votes: 0,
			id: '1'
		},
		{
			content: 'Premature optimization is the root of all evil',
			author: 'Donald Knuth',
			info: 'http://wiki.c2.com/?PrematureOptimization',
			votes: 0,
			id: '2'
		}
	])

	const [notification, setNotification] = useState('')
	let notificationTimer;

	const history = useHistory()

	const flashNotification = (content) => {
		setNotification(content)
		notificationTimer = setTimeout(() => setNotification(''), 10000)
	}

	const addNew = (anecdote) => {
		anecdote.id = (Math.random() * 10000).toFixed(0)
		setAnecdotes(anecdotes.concat(anecdote))
		flashNotification(`A new anecdote "${anecdote.content}" created!`)
		history.push('/')
	}

	const anecdoteById = (id) =>
		anecdotes.find(a => a.id === id)

	const vote = (id) => {
		const anecdote = anecdoteById(id)

		const voted = {
			...anecdote,
			votes: anecdote.votes + 1
		}

		setAnecdotes(anecdotes.map(a => a.id === id ? voted : a))
	}

	let anecdote;
	const anecdoteMatch = useRouteMatch('/anecdotes/:id')

	if (anecdoteMatch) {
		anecdote = anecdoteById(anecdoteMatch.params.id)
	}

	return (
		<div>
			<h1>Software anecdotes</h1>
			<Menu />
			<Notification content={notification} />
			<Switch>
				<Route path="/anecdotes/:id">
					<Anecdote anecdote={anecdote} />
				</Route>
				<Route path="/about">
					<About />
				</Route>
				<Route path="/create">
					<CreateNew addNew={addNew} />
				</Route>
				<Route path="/">
					<AnecdoteList anecdotes={anecdotes} />
				</Route>
			</Switch>
			<Footer />
		</div>
	)
}

export default App;
