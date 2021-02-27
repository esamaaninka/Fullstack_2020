import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'

import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'
import { showNotification } from './reducers/notificationReducer'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  //const [message, setMessage] = useState(initMessage)

  const blogFormRef = React.createRef()

  const dispatch = useDispatch()

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


  const sendNofitication = (message, error) => {
    //console.log('sendNotificaton dispaching: ', message, error)
    dispatch(showNotification(message,error, 5))
  }

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
      sendNofitication('Wrong credentials!', true)
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
        sendNofitication(`Created new blog: "${returnedBlog.title}"`, false)
      })
      .catch(() => {
        sendNofitication('Error creating blog: ', true)
      })
  }

  const likeBlog = (blogObject) => {
    //console.log('App.js likeBlog: ', blogObject)
    blogService
      .update(blogObject.id, blogObject)
      .then(returnedBlog => {
        setBlogs(blogs.map(b => b.id !== blogObject.id ? b : returnedBlog))
        sendNofitication(`Liked blog: "${returnedBlog.title}"`, false)
      })
      .catch(() => {
        sendNofitication('error in liking the blog', true)
      })
  }

  const removeBlog = (blogObject) => {

    blogService
      .remove(blogObject.id)
      .then( () => {
        setBlogs(blogs.filter(blog => blog.id !== blogObject.id))
        sendNofitication(`Removed successfully blog: "${blogObject.title}"`,false)
      })
      .catch ((error) => {
        //console.log('Remove Blog err: ', error.response.data.error)
        sendNofitication(error.response.data.error, true)
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
        <Notification />

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
      <Notification />
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