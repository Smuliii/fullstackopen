import React, { useState } from 'react'
import { TextField, Button } from '@material-ui/core';

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
        <TextField label="Title" name="title" id="title" value={formData.title || ''} onChange={handleInputChange} />
      </div>
      <div>
        <TextField label="Author" name="author" id="author" value={formData.author || ''} onChange={handleInputChange} />
      </div>
      <div>
        <TextField label="Url" name="url" id="url" value={formData.url || ''} onChange={handleInputChange} />
      </div>
	  <p><Button variant="contained" color="primary" type="submit">Add</Button></p>
    </form>
  )
}

export default BlogForm
