import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'
import blogForm from './components/BlogForm'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('') 
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)
  //const [blogFormVisible, setBlogFormVisible] =useState(false)
  //const [newBlog, setNewBlog] = useState('')

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
      //console.log('After login user: ', user)

      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )

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
    // nullify token ?
  }

  

  
  
  



  if(user === null)  {
    return (
      <div>
        <Notification message={errorMessage} />
 
        <h2>Log in to the application</h2>
      
        <form onSubmit={handleLogin}>
          
        <div>
          username
            <input
            type="text"
            value={username}
            name="Username"
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          password
            <input
            type="password"
            value={password}
            name="Password"
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button type="submit">login</button>
      </form> 
    </div>
    )}

    return (
      <div>
        <h2>Blogs</h2>
        <p>{user.name} is logged in</p>
        <button onClick={() => handleLogout()}> Logout </button>
        <p></p>
        {blogForm()}
        <ul>
          {blogs.map(blog => 
            <Blog key={blog.id} blog={blog} /> 
          )}
        </ul>
      </div>
    )
    
}  
    
export default App