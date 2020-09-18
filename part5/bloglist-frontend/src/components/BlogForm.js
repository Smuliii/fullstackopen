import React, { useState } from 'react'

const BlogForm = ({ createNewBlog }) => {
  const [formData, setFormData] = useState({})

  const handleSubmit = async e => {
    e.preventDefault()

    const success = await createNewBlog(formData)
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
    <form className="blog-form" method="post" onSubmit={handleSubmit}>
      <h3>Add a new blog</h3>
      <div>
        <label htmlFor="title">Title: </label>
        <input type="text" name="title" id="title" value={formData.title || ''} onChange={handleInputChange} />
      </div>
      <div>
        <label htmlFor="author">Author: </label>
        <input type="text" name="author" id="author" value={formData.author || ''} onChange={handleInputChange} />
      </div>
      <div>
        <label htmlFor="url">Url: </label>
        <input type="text" name="url" id="url" value={formData.url || ''} onChange={handleInputChange} />
      </div>
      <button type="submit">Add</button>
    </form>
  )
}

export default BlogForm
