import React from 'react'
import Togglable from './Togglable'

const Blog = ({ blog, handleBlogLike, handleBlogDelete }) => {
  const style = {
    border: '2px solid black',
    margin: '0 0 10px',
    padding: '5px',
  }

  return (
    <div className="blog" style={style}>
      <div className="blog-title">{blog.title}</div>
	  <div className="blog-author">{blog.author}</div>
      <Togglable buttonLabel="Show">
        <div className="blog-likes">Likes {blog.likes} <button className="blog-like" onClick={() => handleBlogLike(blog.id)}>Like</button><br/></div>
        <button className="blog-delete" onClick={() => handleBlogDelete(blog.id)}>Delete</button><br/>
      </Togglable>
    </div>
  )
}

export default Blog
