import PropTypes from 'prop-types'
import React from 'react'
import Blog from './Blog'
import BlogForm from './BlogForm'
import Notification from './Notification'
import Togglable from './Togglable'

const UserProfile = React.forwardRef(({ blogs, user, handleLogOut, handleBlogLike, handleBlogDelete, createNewBlog }, ref) => {
  return (
    <div className="user-profile">
      <h2>Hello, {user.name}</h2>
      <Notification />
      <button onClick={handleLogOut}>Logout</button>
      <Togglable labelShow="Add new blog" labelHide="Cancel" ref={ref}>
        <BlogForm createNewBlog={createNewBlog} />
      </Togglable>
      <h3>Blogs</h3>
      <div className="blog-list">
        {blogs.sort((a, b) => b.likes - a.likes).map(blog => (
          <Blog key={blog.id} blog={blog} handleBlogLike={handleBlogLike} handleBlogDelete={handleBlogDelete} />
        ))}
      </div>
    </div>
  )
})

UserProfile.displayName = 'UserProfile'
UserProfile.propTypes = {
  blogs: PropTypes.array.isRequired,
  user: PropTypes.object.isRequired,
  notification: PropTypes.object,
  handleLogOut: PropTypes.func.isRequired,
  handleBlogLike: PropTypes.func.isRequired,
  handleBlogDelete: PropTypes.func.isRequired,
  createNewBlog: PropTypes.func.isRequired,
}

export default UserProfile
