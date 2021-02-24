const Blog = require('../models/blog')
const User = require('../models/users')

const initialBlogs = [
  {
    title: 'Blogging is easy',
    author: 'Teppo Testaaja', 
    url: 'www.google.com',
    likes: 5
  },
  {
    title: 'Surfing the net is interesting',
    author: 'Jaska Jokunen', 
    url: 'www.yle.fi',
    likes: 1
  }
]

const nonExistingId = async () => {
  const blog = new Blog({ title: 'willremovethissoon',author: 'Jope Joppe' })
  await blog.save()
  await blog.remove()

  return blog._id.toString()
}

const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map(b => b.toJSON())
}

const usersInDb = async () => {
  const users = await User.find({})
  return users.map(u => u.toJSON())
}


module.exports = {
  initialBlogs, nonExistingId, blogsInDb, usersInDb
}