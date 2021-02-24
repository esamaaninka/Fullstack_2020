import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)

  const blogFormRef = React.createRef()

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, []) // to get prev. logged in user data first time when app opened. User logged in until logout.

  const handleLogin = async (event) => {
    event.preventDefault()
    //console.log('logging in with', username, password)
    try {
      const user = await loginService.login({
        username, password,
      })

      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )
      blogService.setToken(user.token)

      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      setErrorMessage('Wrong credentials')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const handleLogout = () => {
    window.localStorage.removeItem('loggedBlogappUser')
    setUser(null)
    setUsername('')
    setPassword('')
    blogService.setToken(null)
  }

  const createBlog = (blogObject) => {
    blogFormRef.current.toggleVisibility()
    blogService.create(blogObject)
      .then(returnedBlog => {
        setBlogs(blogs.concat(returnedBlog))
        //setNewBlog('')
      })
  }

  const likeBlog = (blogObject) => {
    console.log('App.js likeBlog: ', blogObject)
    blogService
      .update(blogObject.id, blogObject)
      .then(returnedBlog => {
        setBlogs(blogs.map(b => b.id !== blogObject.id ? b : returnedBlog))
      })
      .catch(() => { // why not catching err ?
        setErrorMessage('error in liking the blog')
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
      })
  }

  const removeBlog = (blogObject) => {
    /*
    //console.log('App.js removeBlog id: ', blogObject)

    try {
      await blogService.remove(blogObject.id)

      setBlogs(blogs.filter(blog => blog.id !== blogObject.id))

    } catch (error)  {
      //debugger

      console.log("catched error in removeBlog", error.response.data)
      setErrorMessage(error.response.data)
      setTimeout(() => { // no error message window, how to render ?
        setErrorMessage(null)
      }, 5000)
    }
  }
  */
    blogService
      .remove(blogObject.id)
      .then( () => {
        setBlogs(blogs.filter(blog => blog.id !== blogObject.id))
      })
      .catch ((error) => {
        console.log(error.response.data)
        setErrorMessage(error.response.data) // no error message window ?
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
      })
  }

  const blogForm = () => (
    <Togglable buttonLabel='new blog' ref={blogFormRef}>
      <BlogForm createBlog={createBlog} />
    </Togglable>
  )

  if(user === null)  {
    return (
      <div>
        <Notification message={errorMessage} />

        <h2>Log in to the application</h2>

        <form onSubmit={handleLogin}>

          <div>
            username
            <input
              id='username'
              type="text"
              value={username}
              name="Username"
              onChange={({ target }) => setUsername(target.value)}
            />
          </div>
          <div>
            password
            <input
              id='password'
              type="password"
              value={password}
              name="Password"
              onChange={({ target }) => setPassword(target.value)}
            />
          </div>
          <button id="login-button" type="submit">login</button>
        </form>
      </div>
    )}

  return (
    <div className='blogList'>
      <h2>Blogs</h2>
      <p>{user.name} is logged in</p>
      <button onClick={() => handleLogout()}> Logout </button>
      <p></p>
      {blogForm()}
      <ul>
        {blogs
          .sort((a,b) => (a.likes < b.likes ? 1 : -1))
          .map(blog =>
            <Blog key={blog.id} blog={blog} likeBlog={likeBlog} removeBlog={removeBlog}/>
          )}
      </ul>
    </div>
  )
}

export default App