import React from 'react'
import { useSelector } from 'react-redux'
import Comments from './Comments'
import { Card, CardActions, CardContent, Button } from '@material-ui/core';

const Blog = ({ blog, handleBlogLike, handleBlogDelete, handleBlogComment }) => {
  const loggedInUser = useSelector(state => state.user);

  if (!blog) {
    return null;
  }

  return (
    <div className="blog">
		<Card>
			<CardContent>
				<h1 className="blog-title">{blog.title}</h1>
				<div className="blog-url"><a href={blog.url} target="_blank" rel="noopener noreferrer" >{blog.url}</a></div>
				<div className="blog-likes">Likes <span className="blog-like-count">{blog.likes}</span> <Button className="blog-like" onClick={() => handleBlogLike(blog.id)}>Like</Button><br/></div>
				<div className="blog-author">added by {blog.author}</div>
			</CardContent>
			<CardActions>
				{loggedInUser?.username === blog.user?.username ? (
					<Button className="blog-delete" onClick={() => handleBlogDelete(blog.id)}>Delete</Button>
				) : null}
			</CardActions>
		  </Card>
		  <br />
		<Comments blogId={blog.id} comments={blog.comments} handleBlogComment={handleBlogComment} />
    </div>
  )
}

export default Blog


