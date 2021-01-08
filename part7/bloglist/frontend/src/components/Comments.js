import React, { useState } from 'react';
import { Card, CardActions, CardContent, Button, TextField, List, ListItem } from '@material-ui/core';

const Comments = ({ blogId, comments, handleBlogComment }) => {
	const [formData, setFormData] = useState({})

	const handleSubmit = async e => {
		e.preventDefault()

		const success = await handleBlogComment(blogId, formData.comment)
		if (success) {
			setFormData({})
		}
	}

	const handleInputChange = e => {
		setFormData({
			...formData,
			[e.target.name]: e.target.value,
		})
	}

	return (
		<Card>
			<CardContent>
				<h3>comments</h3>
				<List>
					{comments.map(comment => (
						<ListItem key={comment.id}>{comment.content}</ListItem>
					))}
				</List>
			</CardContent>
			<CardActions>
				<form method="post" onSubmit={handleSubmit}>
					<TextField label="Comment" name="comment" value={formData.comment || ''} onChange={handleInputChange} />
					<p><Button variant="contained" color="primary" type="submit">add comment</Button></p>
				</form>
			</CardActions>
		</Card>
	)
}

export default Comments;
