import React, { useState } from 'react'
import PropTypes from 'prop-types'


const BlogForm = ({ createBlog }) => {
  const [newBlog, setNewBlog] = useState('')

  const handleBlogChange = (event) => {
    //console.log('handleblogchange updating: ', event.target.value)
    setNewBlog({
      ...newBlog,
      [event.target.name]: event.target.value
    })
  }

  const addBlog = (event) => {
    event.preventDefault()
    //console.log('attempt to send blog: ', newBlog)
    createBlog({
      title: newBlog.title,
      author: newBlog.author,
      url: newBlog.url
    })

    setNewBlog('')
  }

  return (
    <div>
      <h2>Create a new blog</h2>
      <form onSubmit={addBlog}>
        <div> title:
          <input
            id="title"
            value={newBlog.title || ''} // "...|| '')" to get rid of "Warning: A component is changing an uncontrolled input of type text to be controlled. Input elements should not switch from uncontrolled to controlled (or vice versa). Decide between using a controlled or uncontrolled input element for the lifetime of the component.*"
            name="title"
            onChange={handleBlogChange}
          />
        </div>
        <div> author:
          <input
            id="author"
            value={newBlog.author || ''}
            name="author"
            onChange={handleBlogChange}
          />
        </div>
        <div> url:
          <input
            id="url"
            value={newBlog.url || ''}
            name="url"
            onChange={handleBlogChange}
          />
        </div>

        <button id="create-button" type="submit">Create</button>
      </form>
    </div>
  )
}


BlogForm.propTypes = {
  createBlog: PropTypes.func.isRequired
  //handleBlogChange: PropTypes.func.isRequired,
}

export default BlogForm