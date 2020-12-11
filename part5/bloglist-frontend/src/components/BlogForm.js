import React, { useState } from 'react'

const handleBlogChange = (event) => {
  //console.log('handleblogchange updating: ', event.target.value)
  setNewBlog({
    ...newBlog,
    [event.target.name]: event.target.value
  })
}

const addBlog = (event) => {
  event.preventDefault()
  //console.log('Was blogform cancelled', blogFormVisible, newBlog) 
  if(blogFormVisible) { // if blogform was not cancelled (but why we enter here after cancel button ? ) 
    const blogObject = {
      title: newBlog.title,
      author: newBlog.author,
      url: newBlog.url 
    }
    //console.log('attempt to send blog: ', blogObject)
    blogService.create(blogObject)
      .then(returnedBlog => {
        setBlogs(blogs.concat(returnedBlog))
        setNewBlog('')
      })
  } else {
    setNewBlog('')
  }
  
}

const blogForm = () => {

  const [blogFormVisible, setBlogFormVisible] =useState(false)
  const [newBlog, setNewBlog] = useState('')


  const hideWhenVisible = { display: blogFormVisible ? 'none' : '' }
  const showWhenVisible = { display: blogFormVisible ? '' : 'none' }
 

  return (
    <div>
      <div style={hideWhenVisible}>
        <button onClick={() => setBlogFormVisible(true)}>New blog</button>
      </div>
      <div style={showWhenVisible} >
        <form onSubmit={addBlog}>
          <div> title:
          <input 
            value={newBlog.title || ''} // "...|| '')" to get rid of "Warning: A component is changing an uncontrolled input of type text to be controlled. Input elements should not switch from uncontrolled to controlled (or vice versa). Decide between using a controlled or uncontrolled input element for the lifetime of the component.*"
            name="title"
            onChange={handleBlogChange}
          />
          </div>
          <div> author:
          <input
            value={newBlog.author || ''}
            name="author"
            onChange={handleBlogChange}
          />
          </div>
          <div> url:
          <input
            value={newBlog.url || ''}
            name="url"
            onChange={handleBlogChange}
          />
        </div>
        <button onClick={() => {
          setBlogFormVisible(false)
          setNewBlog('') 
          }
        }>cancel</button>
        <button type="submit">Create</button>
      </form>  
      </div>
    </div>
  )
}




export default blogForm