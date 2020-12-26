const jwt = require('jsonwebtoken')
const blogRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/users')

// strip the token from the request
//
const getTokenFrom = request => {
  const authorization = request.get('authorization')
  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    return authorization.substring(7)
  }
  return null
}


blogRouter.get('/api/blogs/', async (request, response) => {
  const blogs = await Blog
    .find({})
    .populate('user', { username: 1, name: 1, id: 1 })

  response.json(blogs)
})

blogRouter.get('/api/blogs/:id', (request, response, next) => {
  Blog
    .findById(request.params.id)
    .then(blog => {
      if(blog){
        response.json(blog.toJSON())
      } else {
        response.status(404).end()
      }
    })
    .catch(error => next(error))
})

blogRouter.post('/api/blogs', async (request, response, next) => {

  const token = getTokenFrom(request)
  const decodedToken = jwt.verify(token, process.env.SECRET)
  if (!token || !decodedToken.id) {
    return response.status(401).json({ error: 'token missing or invalid' })
  }
  const user = await User.findById({_id: decodedToken.id})

  const blog = new Blog({
    title: request.body.title,
    author: request.body.author,
    url: request.body.url,
    likes: request.body.likes,
    user: user.id
  })

  const savedBlog = await blog.save()
  user.blogs = user.blogs.concat(savedBlog._id)
  await user.save()

  response.status(201).json(savedBlog)

})


blogRouter.delete('/api/blogs/:id', async (request, response) => {
  const token = getTokenFrom(request)
  const decodedToken = jwt.verify(token, process.env.SECRET)
  if (!token || !decodedToken.id) {
    return response.status(401).json({ error: 'token missing or invalid' })
  }

  const blogToDelete = await Blog.findById(request.params.id)
  const blogCreator = blogToDelete.user
  const deleteRequestor = await User.findById(decodedToken.id)

  if(deleteRequestor._id.toString() !== blogCreator._id.toString()) {
    response.status(401).json({ error: 'Not allowed: Delete attempt by not creator' })
  }
  else {
    await Blog.findByIdAndRemove({ _id: request.params.id })

    await User.findOneAndUpdate(
      { _id: decodedToken.id },
      {  $pull: {
        'blogs': request.params.id
      }
      }
    )
    response.status(200).end()
  }
})

blogRouter.put('/api/blogs/:id', async (request, response) => {

  const blog = {
    title: request.body.title,
    author: request.body.author,
    url: request.body.url,
    likes: request.body.likes
  }

  const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, {new: true, omitUndefined: true})

  response.status(200).json(updatedBlog)
})

module.exports = blogRouter