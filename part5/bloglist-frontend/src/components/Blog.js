import React from 'react'

// ei vaikutusta vaikka missä välissä olisi div, ul, li
// classNAme tarvitaan testauksessa? 
const blogStyle = {
  fontstyle: 'italic',
  liststyletype: 'none'
}

const Blog = ({ blog }) => {

  return (
    <div >
      <ul>
        <li style={blogStyle} className='blog'>
          {blog.title}: {blog.author}
        </li>
      </ul>
    </div>
  )
}

export default Blog
