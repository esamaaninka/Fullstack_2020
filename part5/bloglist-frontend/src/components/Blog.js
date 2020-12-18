import React from 'react'

const Blog = ({ blog, likeBlog }) => {

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const listStyle = {
    listStyleType: 0 // study how to get rid of bullets
  }

  const handleBlogLiked = (event) => {
    event.preventDefault()
    console.log('Blog.js handleBlogLiked',blog)
    likeBlog({
      title: blog.title,
      author: blog.author,
      url: blog.url,
      id: blog.id,
      likes: blog.likes+1,
      user: blog.user.id
    })
  }

  return (
    <div style={blogStyle} className='blog'>
      <ul>
        <li>{blog.title}</li> 
        <li>{blog.author} </li>
        <li>{blog.likes} {' '}
          <button label="Like" onClick={handleBlogLiked}>Like</button>
        </li>
      </ul>
    </div>
  )
}

export default Blog
