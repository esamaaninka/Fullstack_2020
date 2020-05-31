const blogRouter = require('express').Router()
const Blog = require('../models/blog')

// TÄSSÄ JOTAIN VIKAA
blogRouter.get('/api/blogs', (request, response, next) => {
    Blog
      .find({})
      .then(blogs => {
        //response.json(blogs)
        response.json(blogs.map(b => b.toJSON()))
      })
      .catch(error => next(error))
  })
  
  blogRouter.post('/api/blogs', (request, response, next) => {
    const blog = new Blog(request.body)
    /* yo tekee saman
    const blog = new Blog({
        title: request.body.title,
        author: request.body.author,
        url: request.body.url,
        likes: request.body.likes
    })
*/
    blog
      .save()
      .then(result => {
        response.status(201).json(result)
      })
      .catch(error => next(error))
  })

  module.exports = blogRouter