import PropTypes from 'prop-types'
import React from 'react'
import { Link as RouterLink } from 'react-router-dom';
import BlogForm from './BlogForm'
import Notification from './Notification'
import Togglable from './Togglable'
import { List, ListItem } from '@material-ui/core';

const Blogs = React.forwardRef(({ blogs, user, createNewBlog }, ref) => {
  return (
    <div className="user-profile">
      <h2>Hello, {user.name}</h2>
      <Notification />
      <Togglable labelShow="Add new blog" labelHide="Cancel" ref={ref}>
        <BlogForm createNewBlog={createNewBlog} />
      </Togglable>
      <h3>Blogs</h3>
      <List className="blog-list">
        {blogs.sort((a, b) => b.likes - a.likes).map(blog => (
          <ListItem button component={RouterLink} to={`/blogs/${blog.id}`}>{blog.title}</ListItem>
        ))}
      </List>
    </div>
  )
})

Blogs.displayName = 'Blogs'
Blogs.propTypes = {
  blogs: PropTypes.array.isRequired,
  user: PropTypes.object.isRequired,
  notification: PropTypes.object,
  createNewBlog: PropTypes.func.isRequired,
}

export default Blogs
